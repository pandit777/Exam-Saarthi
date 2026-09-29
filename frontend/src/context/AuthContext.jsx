import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { api, setAuthToken } from '../utils/api';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// ⭐ Cookies clear karne ka helper (431 fix)
const clearAllCookies = () => {
  if (typeof document === 'undefined') return;

  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!name) return;

    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    const paths = ['/', ''];
    const domains = [
      '',
      `;domain=${window.location.hostname}`,
      `;domain=.${window.location.hostname}`,
      ';domain=.examsaarthi.com',
      ';domain=examsaarthi.com',
      ';domain=.onrender.com',
    ];

    paths.forEach((path) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=;${expire};path=${path}${domain}`;
      });
    });
  });
};

// ⭐ Supabase ke localStorage keys clear karne ka helper
const clearSupabaseStorage = () => {
  if (typeof localStorage === 'undefined') return;

  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sb-') || key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
  } catch (err) {
    // silent fail
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionSyncInProgress = useRef(false);

  const logUserAction = async (userData, action, details = {}) => {
    if (!userData?.id || !userData?.email) return;
  };

  // =====================================================
  // LOAD SESSION ON MOUNT
  // =====================================================
  useEffect(() => {
    const syncSession = async (session) => {
      if (!session?.access_token || !session.user || sessionSyncInProgress.current) return;

      sessionSyncInProgress.current = true;
      setAuthToken(session.access_token);

      const sessionUser = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
        mobile: session.user.user_metadata?.mobile,
        university: session.user.user_metadata?.university,
        course: session.user.user_metadata?.course,
        role: 'user',
        avatar_url:
          session.user.user_metadata?.avatar_url ||
          session.user.user_metadata?.picture ||
          localStorage.getItem(`profileAvatar:${session.user.id}`) ||
          undefined,
      };
      setUser(sessionUser);
      setUserProfile(sessionUser);
      setIsLoggedIn(true);

      try {
        const provider = session.user.app_metadata?.provider;
        const response = provider === 'google'
          ? await api.oauthCallback(session.access_token)
          : await api.getMe();

        if (response.success && (response.user || response.profile)) {
          const syncedUser = response.user || response.profile;
          setUser(syncedUser);
          setUserProfile(syncedUser);
          if (syncedUser.avatar_url) {
            localStorage.setItem(`profileAvatar:${syncedUser.id}`, syncedUser.avatar_url);
          }
        }
      } catch (error) {
        if (session.user.app_metadata?.provider === 'google' && error.message?.includes('Only Gmail')) {
          await supabase.auth.signOut();
          setAuthToken(null);
          setUser(null);
          setUserProfile(null);
          setIsLoggedIn(false);
        } else {
          console.error('Auth session sync failed:', error.message);
        }
      } finally {
        sessionSyncInProgress.current = false;
        setLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.access_token) {
        await syncSession(session);
      } else if (event === 'SIGNED_OUT') {
        setAuthToken(null);
        setUser(null);
        setUserProfile(null);
        setIsLoggedIn(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        syncSession(session);
      } else {
        setLoading(false);
      }
    }).catch(() => setLoading(false));

    return () => subscription.unsubscribe();
  }, []);

  // =====================================================
  // EMAIL LOGIN
  // =====================================================
  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);

      if (response.success) {
        if (!response.session?.access_token) {
          throw new Error('Login succeeded but no session was created. Please try again.');
        }
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: response.session.access_token,
          refresh_token: response.session.refresh_token,
        });
        if (sessionError) throw sessionError;
        setAuthToken(response.session.access_token);
        setUser(response.user);
        setUserProfile(response.user);
        setIsLoggedIn(true);
        await logUserAction(response.user, 'login', { source: 'email' });
      }

      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================
  const register = async (userData) => {
    try {
      const response = await api.register(userData);

      if (response.success && response.session) {
        if (!response.session.access_token) {
          throw new Error('Account created but no session was created. Please login again.');
        }
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: response.session.access_token,
          refresh_token: response.session.refresh_token,
        });
        if (sessionError) throw sessionError;
        setAuthToken(response.session.access_token);
        setUser(response.user);
        setUserProfile(response.user);
        setIsLoggedIn(true);
        await logUserAction(response.user, 'register', { source: 'email' });
      }

      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================
  const loginWithGoogle = async () => {
    try {
      const response = await api.getGoogleUrl();

      if (response.success && response.url) {
        window.location.href = response.url;
        return { error: null };
      } else {
        throw new Error('Failed to get Google URL');
      }
    } catch (error) {
      return { error };
    }
  };

  // =====================================================
  // LOGOUT (431 fix + full page reload)
  // =====================================================
  const logout = async () => {
    try {
      // 1. Backend ko logout request bhejein (silent fail ok)
      await api.logout();
    } catch (err) {
      // silent fail
    }

    try {
      // 2. Supabase signOut
      await supabase.auth.signOut();
    } catch (err) {
      // silent fail
    }

    // ⭐⭐⭐ 431 FIX — Saari cookies aur storage clear karein ⭐⭐⭐
    clearAllCookies();           // Saari browser cookies clear
    clearSupabaseStorage();      // Supabase ke localStorage keys clear

    // LocalStorage aur SessionStorage clear (profileAvatar preserve karein)
    if (typeof localStorage !== 'undefined') {
      const avatarKeys = {};
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('profileAvatar:')) {
          avatarKeys[key] = localStorage.getItem(key);
        }
      });
      localStorage.clear();
      Object.entries(avatarKeys).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    }
    if (typeof sessionStorage !== 'undefined') sessionStorage.clear();

    // State reset
    setAuthToken(null);
    setUser(null);
    setUserProfile(null);
    setIsLoggedIn(false);

    // ⭐⭐⭐ FULL PAGE RELOAD — console clear + fresh state ⭐⭐⭐
    window.location.href = '/';
  };

  // =====================================================
  // HELPERS
  // =====================================================
  const getDisplayName = () =>
    userProfile?.name || user?.name || user?.email?.split('@')[0] || 'User';

  const getAvatarUrl = () => userProfile?.avatar_url || user?.avatar_url || null;

  const getInitial = () => getDisplayName().charAt(0).toUpperCase();

  const updateProfile = (profile) => {
    if (profile?.id && profile.avatar_url) {
      localStorage.setItem(`profileAvatar:${profile.id}`, profile.avatar_url);
    } else if (profile?.id && profile.avatar_url === null) {
      localStorage.removeItem(`profileAvatar:${profile.id}`);
    }
    setUserProfile(profile);
    setUser((currentUser) => (currentUser ? { ...currentUser, ...profile } : currentUser));
  };

  const value = {
    user,
    userProfile,
    isLoggedIn,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    getDisplayName,
    getAvatarUrl,
    getInitial,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
