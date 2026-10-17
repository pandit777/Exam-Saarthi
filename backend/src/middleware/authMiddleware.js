import { createClient } from '@supabase/supabase-js';

// Supabase क्लाइंट इनिशियलाइज़ करें (यह आपके .env फ़ाइल के वेरिएबल्स का उपयोग करेगा)
const supabase = createClient(
  process.env.SUPABASE_URL || '', 
  process.env.SUPABASE_ANON_KEY || ''
);

export const requireAuth = async (req, res, next) => {
  try {
    // 1. पोस्टमैन या फ्रंटएंड से आ रहे Authorization हेडर को निकालें
    const authHeader = req.headers.authorization;
    
    // 2. चेक करें कि हेडर मौजूद है और 'Bearer ' से शुरू हो रहा है या नहीं
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: No Token Provided. Login required.',
      });
    }

    // 3. 'Bearer ' शब्द को हटाकर असली टोकन स्ट्रिंग अलग करें
    const token = authHeader.split(' ')[1];

    // 4. Supabase के ज़रिए इस JWT टोकन को लाइव वैलिडेट करें
    const { data: { user }, error } = await supabase.auth.getUser(token);

    // 5. अगर टोकन गलत है या एक्सपायर हो चुका है, तो ब्लॉक करें
    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or expired token.',
      });
    }

    // 6. अगर सब सही है, तो यूजर का डेटा रिक्वेस्ट में सेव करके आगे जाने दें
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error during authentication',
    });
  }
};
