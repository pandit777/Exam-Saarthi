import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0);

  useEffect(() => {
    const checkAdmin = async (session) => {
      const currentRequest = ++requestId.current;
      const userId = session?.user?.id;

      if (!userId) {
        if (currentRequest === requestId.current) {
          setIsAdminUser(false);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .maybeSingle();

        if (currentRequest === requestId.current) setIsAdminUser(!error && data?.role === 'admin');
      } catch (err) {
        if (currentRequest === requestId.current) setIsAdminUser(false);
      } finally {
        if (currentRequest === requestId.current) setLoading(false);
      }
    };

    supabase.auth.getSession()
      .then(({ data: { session } }) => checkAdmin(session))
      .catch(() => {
        setIsAdminUser(false);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        requestId.current += 1;
        setIsAdminUser(false);
        setLoading(false);
      } else if (session?.user) {
        void checkAdmin(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdminUser, loading }}>
      {children}
    </AdminContext.Provider>
  );
};