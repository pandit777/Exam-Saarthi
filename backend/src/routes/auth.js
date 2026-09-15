import express from 'express';
import { FRONTEND_URL } from '../utils/frontendConfig.js';
import { body, validationResult } from 'express-validator';
import { supabase, supabaseAdmin } from '../utils/supabase.js';

const router = express.Router();

// =====================================================
// REGISTER
// =====================================================
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('mobile').trim().matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit mobile required'),
    body('university').trim().notEmpty().withMessage('University required'),
    body('course').trim().notEmpty().withMessage('Course required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { name, email, mobile, university, course, password } = req.body;
      console.log('📝 Register attempt:', email);

      const { data: existing } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered. Please login.',
        });
      }

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true,
        user_metadata: { full_name: name, mobile, university, course },
      });

      if (authError) {
        console.error('❌ Auth error:', authError.message);
        return res.status(400).json({
          success: false,
          message: authError.message,
        });
      }

      console.log('✅ Auth user created:', authData.user.id);

      const { error: dbError } = await supabaseAdmin.from('users').insert([
        {
          id: authData.user.id,
          email: email.toLowerCase(),
          name,
          mobile,
          university,
          course,
          role: 'user',
          active: true,
        },
      ]);

      if (dbError) {
        console.error('❌ DB error:', dbError.message);
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        return res.status(500).json({
          success: false,
          message: 'Failed to create profile',
        });
      }

      console.log('✅ Profile saved');

      const { data: sessionData } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
          mobile,
          university,
          course,
          role: 'user',
        },
        session: sessionData?.session || null,
      });
    } catch (error) {
      console.error('❌ Register error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during registration',
      });
    }
  }
);

// =====================================================
// LOGIN
// =====================================================
router.post(
  '/login',
  [body('email').trim().isEmail().normalizeEmail(), body('password').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;
      console.log('🔐 Login attempt:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        console.error('❌ Login error:', error.message);
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      console.log('✅ Login successful:', data.user.email);

      const { data: profile } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          name: profile?.name || data.user.user_metadata?.full_name,
          mobile: profile?.mobile,
          university: profile?.university,
          course: profile?.course,
          role: profile?.role || 'user',
          avatar_url: profile?.avatar_url,
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at,
        },
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }
);

// =====================================================
// GOOGLE OAUTH - Get URL
// =====================================================
router.get('/google', async (req, res) => {
  try {
    console.log('🔵 Google OAuth URL requested');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${FRONTEND_URL}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;

    console.log('✅ Google URL generated');

    return res.json({
      success: true,
      url: data.url,
    });
  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Google OAuth failed',
    });
  }
});

// =====================================================
// OAUTH CALLBACK - Sync user to DB
// =====================================================
router.post('/oauth-callback', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: 'Access token required',
      });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(access_token);

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    console.log('✅ OAuth user:', user.email);

    // Check if profile exists
    const { data: existingProfile } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    let profile = existingProfile;

    // Create if not exists
    if (!existingProfile) {
      console.log('🔵 Creating profile for Google user');

      const newProfile = {
        id: user.id,
        email: user.email,
        name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email.split('@')[0],
        avatar_url:
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          null,
        role: 'user',
        active: true,
      };

      const { data: created, error: createError } = await supabaseAdmin
        .from('users')
        .insert([newProfile])
        .select()
        .single();

      if (createError) {
        console.error('❌ Profile create error:', createError.message);
        profile = newProfile;
      } else {
        profile = created;
        console.log('✅ Profile created');
      }
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: profile?.name,
        avatar_url: profile?.avatar_url,
        mobile: profile?.mobile,
        university: profile?.university,
        course: profile?.course,
        role: profile?.role || 'user',
      },
      session: {
        access_token,
      },
    });
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    return res.status(500).json({
      success: false,
      message: 'OAuth callback failed',
    });
  }
});

// =====================================================
// LOGOUT
// =====================================================
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      await supabase.auth.admin.signOut(token);
    }
  } catch (err) {
    // Ignore
  }
  return res.json({ success: true, message: 'Logged out' });
});

// =====================================================
// GET ME
// =====================================================
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token' });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: profile?.name,
        mobile: profile?.mobile,
        university: profile?.university,
        course: profile?.course,
        role: profile?.role || 'user',
        avatar_url: profile?.avatar_url,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

const verifyAdmin = async (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    throw new Error('Authorization token required');
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error('Invalid token');
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('users')
    .select('role, email, name')
    .eq('id', user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return { user, profile };
};

router.get('/admin/users', async (req, res) => {
  try {
    await verifyAdmin(req);

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        return res.json({ success: true, users: [] });
      }
      throw error;
    }

    return res.json({ success: true, users: data || [] });
  } catch (error) {
    return res.status(403).json({ success: false, message: error.message || 'Admin access required' });
  }
});

router.get('/admin/logs', async (req, res) => {
  try {
    await verifyAdmin(req);

    const { data, error } = await supabaseAdmin
      .from('user_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        return res.json({ success: true, logs: [] });
      }
      throw error;
    }

    return res.json({ success: true, logs: data || [] });
  } catch (error) {
    return res.status(403).json({ success: false, message: error.message || 'Unable to fetch logs' });
  }
});

router.post('/admin/papers', async (req, res) => {
  try {
    await verifyAdmin(req);

    const { paper_id, paper_name, course_name, semester, google_drive_link } = req.body || {};

    if (!paper_id || !paper_name || !course_name || !semester || !google_drive_link) {
      return res.status(400).json({ success: false, message: 'paper_id, paper_name, course_name, semester and google_drive_link are required' });
    }

    const paperPayload = {
      paper_id: String(paper_id).trim(),
      paper_name: String(paper_name).trim(),
      course_name: String(course_name).trim(),
      semester: String(semester).trim(),
      google_drive_link: String(google_drive_link).trim(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('papers')
      .insert([paperPayload])
      .select()
      .single();

    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        return res.status(500).json({ success: false, message: 'Create the papers table in Supabase before using this feature.' });
      }
      throw error;
    }

    return res.status(201).json({ success: true, message: 'Paper saved successfully', paper: data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Unable to save paper' });
  }
});

router.post('/admin/reset-password', async (req, res) => {
  try {
    const adminSession = await verifyAdmin(req);
    const { userId, newPassword } = req.body || {};

    if (!userId || !newPassword || String(newPassword).trim().length < 6) {
      return res.status(400).json({ success: false, message: 'A valid user and password of at least 6 characters are required.' });
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: String(newPassword).trim(),
    });

    if (error) {
      throw error;
    }

    await supabaseAdmin.from('user_logs').insert([
      {
        user_id: userId,
        user_email: adminSession.profile.email,
        name: adminSession.profile.name || 'Admin',
        action: 'password_reset',
        details: JSON.stringify({ reset_for_user_id: userId, reset_by: adminSession.user.email }),
        created_at: new Date().toISOString(),
      },
    ]).catch(() => {});

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Password reset failed' });
  }
});

export default router;