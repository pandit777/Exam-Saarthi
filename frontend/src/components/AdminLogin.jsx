import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn, user } = useAuth();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const isAdminSession = isLoggedIn && (user?.role === 'admin' || savedUser?.role === 'admin');

    if (isAdminSession) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (userError || userData?.role !== 'admin') {
        await supabase.auth.signOut();
        setError('You do not have admin access.');
        setLoading(false);
        return;
      }

      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login as admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <i className="fas fa-shield-alt"></i>
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label><i className="fas fa-envelope"></i> Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="igupyq@gmail.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label><i className="fas fa-lock"></i> Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>
                  <i className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (<><span className="spinner"></span> Logging in...</>) : (<><i className="fas fa-sign-in-alt"></i> Login as Admin</>)}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/login">Back to User Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;