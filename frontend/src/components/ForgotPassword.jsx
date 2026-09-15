import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) throw resetError;
      setSuccess('Password reset link sent. Check your email and open the link to set a new password.');
    } catch (resetError) {
      setError(resetError.message || 'Unable to process password reset.');
    } finally {
      setLoading(false);
    }
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
              <h2>Forgot Password?</h2>
              <p>Enter your email to receive a password reset link.</p>
            </div>

            {error && <div className="alert-custom alert-error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            {success && <div className="alert-custom alert-success"><i className="fas fa-check-circle"></i> {success}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="reset-email"><i className="fas fa-envelope"></i> Email</label>
                <input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" required disabled={loading} />
              </div>
                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? <><span className="spinner"></span> Sending...</> : <><i className="fas fa-envelope"></i> Send Reset Link</>}
                </button>
            </form>

            <div className="register-link">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
