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

    // Browser anon key cannot write to protected user_logs table without RLS.
    // Skip the client-side write to prevent the 401 loop and let the backend
    // handle auditing if needed in the future.
  };

  // =====================================================
  // LOAD SESSION ON MOUNT
  // =====================================================
  useEffect(() => {
    const loadSession = async () => {
      try {
        // 1. Check localStorage
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setUserProfile(parsed);
          setIsLoggedIn(true);
        }

        // 2. Check Supabase session (Google OAuth)
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token && session?.user) {
          try {
            const response = await api.oauthCallback(session.access_token);

            if (response.success) {
              localStorage.setItem('auth_token', session.access_token);
              localStorage.setItem('user', JSON.stringify(response.user));

              setUser(response.user);
              setUserProfile(response.user);
              setIsLoggedIn(true);
              await logUserAction(response.user, 'login', { source: 'google' });
            }
          } catch (err) {
            // silent fail for session sync
          }
        }
      } catch (err) {
        // silent fail for session load
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
          }
        } catch (err) {
          // silent fail for auth sync
        }
      } else if (event === 'SIGNED_OUT') {
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
  // LOGOUT
  // =====================================================
  const logout = async () => {
    try {
      await api.logout();
      await supabase.auth.signOut();
    } catch (err) {
      // silent fail for logout
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