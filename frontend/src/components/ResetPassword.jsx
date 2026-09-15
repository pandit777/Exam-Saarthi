import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const checkRecoverySession = async () => {
      const { data } = await supabase.auth.getSession();
      if (active) {
        setHasRecoverySession(Boolean(data.session));
        setCheckingSession(false);
        if (!data.session) setError('This password reset link is invalid or has expired.');
      }
    };

    checkRecoverySession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (active && event === 'PASSWORD_RECOVERY') {
        setHasRecoverySession(true);
        setCheckingSession(false);
        setError('');
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message || 'Unable to update password.');
      return;
    }

    setSuccess('Your password has been updated successfully.');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => navigate('/login'), 1800);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <img src={logo} alt="Exam Saarthi" className="login-logo" />
            <h2 className="brand-title">Exam Saarthi</h2>
            <p className="brand-subtitle">Your path to exam success</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>Set New Password</h2>
              <p>Choose a strong password for your account.</p>
            </div>

            {error && <div className="alert-custom alert-error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            {success && <div className="alert-custom alert-success"><i className="fas fa-check-circle"></i> {success}</div>}

            {checkingSession ? (
              <div className="reset-status"><span className="spinner"></span> Verifying reset link...</div>
            ) : !hasRecoverySession ? (
              <div className="reset-status">Please request a new reset link.</div>
            ) : (
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="new-password"><i className="fas fa-lock"></i> New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="At least 6 characters"
                      minLength="6"
                      required
                      disabled={loading || Boolean(success)}
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                      <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password"><i className="fas fa-lock"></i> Confirm Password</label>
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repeat your password"
                    minLength="6"
                    required
                    disabled={loading || Boolean(success)}
                  />
                </div>
                <button type="submit" className="login-submit-btn" disabled={loading || Boolean(success)}>
                  {loading ? <><span className="spinner"></span> Updating...</> : <><i className="fas fa-key"></i> Update Password</>}
                </button>
              </form>
            )}

            <div className="register-link">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
