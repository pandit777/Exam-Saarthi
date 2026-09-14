import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logUserAction = async (userData, action, details = {}) => {
    if (!userData?.id || !userData?.email) return;

    try {
      await supabase.from('user_logs').insert([
        {
          user_id: userData.id,
          user_email: userData.email,
          name: userData.name || userData.email.split('@')[0],
          action,
          details: JSON.stringify(details),
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.warn('Activity log skipped:', error.message || error);
    }
  };

  // =====================================================
  // LOAD SESSION ON MOUNT
  // =====================================================
  useEffect(() => {
    const loadSession = async () => {
      try {
        console.log('🔵 Loading session...');

        // 1. Check localStorage
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setUserProfile(parsed);
          setIsLoggedIn(true);
          console.log('✅ Session restored:', parsed.email);
        }

        // 2. Check Supabase session (Google OAuth)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token && session?.user) {
          console.log('🔵 Supabase session:', session.user.email);

          try {
            const response = await api.oauthCallback(session.access_token);

            if (response.success) {
              localStorage.setItem('auth_token', session.access_token);
              localStorage.setItem('user', JSON.stringify(response.user));

              setUser(response.user);
              setUserProfile(response.user);
              setIsLoggedIn(true);
              await logUserAction(response.user, 'login', { source: 'google' });
              console.log('✅ Google user synced:', response.user.email);
            }
          } catch (err) {
            console.error('OAuth sync error:', err);
          }
        }
      } catch (err) {
        console.error('Session load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    // =====================================================
    // LISTEN FOR AUTH CHANGES
    // =====================================================
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth event:', event);

      if (event === 'SIGNED_IN' && session?.access_token) {
        try {
          const response = await api.oauthCallback(session.access_token);

          if (response.success) {
            localStorage.setItem('auth_token', session.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));

            setUser(response.user);
            setUserProfile(response.user);
            setIsLoggedIn(true);
            await logUserAction(response.user, 'login', { source: 'oauth' });
            console.log('✅ Auth sync complete');
          }
        } catch (err) {
          console.error('OAuth sync error:', err);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('🔵 User signed out');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        setUserProfile(null);
        setIsLoggedIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // =====================================================
  // EMAIL LOGIN
  // =====================================================
  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);

      if (response.success) {
        localStorage.setItem('auth_token', response.session.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
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
        localStorage.setItem('auth_token', response.session.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
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
      console.log('🔵 Initiating Google login...');

      const response = await api.getGoogleUrl();

      if (response.success && response.url) {
        console.log('✅ Redirecting to Google');
        window.location.href = response.url;
        return { error: null };
      } else {
        throw new Error('Failed to get Google URL');
      }
    } catch (error) {
      console.error('❌ Google login error:', error);
      return { error };
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = async () => {
    try {
      await api.logout();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
      setUserProfile(null);
      setIsLoggedIn(false);
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================
  const getDisplayName = () =>
    userProfile?.name || user?.name || user?.email?.split('@')[0] || 'User';

  const getAvatarUrl = () => userProfile?.avatar_url || user?.avatar_url || null;

  const getInitial = () => getDisplayName().charAt(0).toUpperCase();

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;