import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import logo from '../assets/logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email');
  const [resetToken, setResetToken] = useState('');
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
      if (step === 'email') {
        await api.requestPasswordOtp(cleanEmail);
        setStep('otp');
        setSuccess('OTP sent to your email. It is valid for 10 minutes.');
      } else if (step === 'otp') {
        const response = await api.verifyPasswordOtp(cleanEmail, otp.trim());
        setResetToken(response.resetToken);
        setStep('password');
        setSuccess('OTP verified. Set your new password.');
      } else {
        if (newPassword.length < 6) throw new Error('Password must be at least 6 characters long.');
        if (newPassword !== confirmPassword) throw new Error('Passwords do not match.');
        await api.updatePasswordWithOtp(cleanEmail, resetToken, newPassword);
        setSuccess('Password updated successfully. You can now login.');
        setStep('complete');
      }
    } catch (resetError) {
      setError(resetError.message || 'Unable to process password reset.');
    } finally {
      setLoading(false);
    }
  };

  const getHeading = () => {
    if (step === 'otp') return 'Verify OTP';
    if (step === 'password') return 'Set New Password';
    if (step === 'complete') return 'Password Updated';
    return 'Forgot Password?';
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
              <h2>{getHeading()}</h2>
              <p>
                {step === 'email' && 'Enter your email to receive a one-time password.'}
                {step === 'otp' && `Enter the 6-digit OTP sent to ${email}.`}
                {step === 'password' && 'Choose a strong password for your account.'}
                {step === 'complete' && 'Your account is ready to use with the new password.'}
              </p>
            </div>

            {error && <div className="alert-custom alert-error"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            {success && <div className="alert-custom alert-success"><i className="fas fa-check-circle"></i> {success}</div>}

            {step !== 'complete' && (
              <form className="login-form" onSubmit={handleSubmit}>
                {step === 'email' && (
                  <div className="form-group">
                    <label htmlFor="reset-email"><i className="fas fa-envelope"></i> Email</label>
                    <input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" required disabled={loading} />
                  </div>
                )}
                {step === 'otp' && (
                  <div className="form-group">
                    <label htmlFor="reset-otp"><i className="fas fa-shield-alt"></i> 6-Digit OTP</label>
                    <input id="reset-otp" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="Enter OTP" required disabled={loading} />
                  </div>
                )}
                {step === 'password' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="new-password"><i className="fas fa-lock"></i> New Password</label>
                      <input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 6 characters" minLength="6" required disabled={loading} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password"><i className="fas fa-lock"></i> Confirm Password</label>
                      <input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" minLength="6" required disabled={loading} />
                    </div>
                  </>
                )}
                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? <><span className="spinner"></span> Processing...</> : <><i className="fas fa-arrow-right"></i> {step === 'email' ? 'Send OTP' : step === 'otp' ? 'Verify OTP' : 'Update Password'}</>}
                </button>
              </form>
            )}

            <div className="register-link">
              {step === 'complete' ? <Link to="/login">Go to Login</Link> : <Link to="/login">Back to Login</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
