import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoggedIn || !user) {
        setIsAdminUser(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        setIsAdminUser(!error && data?.role === 'admin');
      } catch (err) {
        setIsAdminUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user, isLoggedIn]);

  return (
    <AdminContext.Provider value={{ isAdminUser, loading }}>
      {children}
    </AdminContext.Provider>
  );
};