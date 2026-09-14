import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { universitiesList as universitiesData } from '../data/universities';
import logo from '../assets/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    university: '',
    course: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const universityOptions = [
    ...universitiesData.map((uni) => ({
      value: uni.fullName,
      label: `${uni.fallbackIcon} ${uni.fullName}`,
    })),
    { value: 'Other University', label: '🎓 Other University' },
  ];

  const courseOptions = [
    'B.Tech',
    'M.Tech',
    'BCA',
    'MCA',
    'BBA',
    'MBA',
    'B.Sc',
    'M.Sc',
    'BA',
    'MA',
    'B.Com',
    'M.Com',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateMobile = (m) => /^[6-9]\d{9}$/.test(m);
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) return setError('Name required');
    if (!validateEmail(formData.email)) return setError('Invalid email');
    if (!validateMobile(formData.mobile)) return setError('Invalid mobile');
    if (!formData.university) return setError('Select university');
    if (!formData.course) return setError('Select course');
    if (formData.password.length < 6) return setError('Password min 6 chars');
    if (formData.password !== formData.confirmPassword)
      return setError('Passwords do not match');

    setLoading(true);

    try {
      const { error: regError } = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        university: formData.university,
        course: formData.course,
        password: formData.password,
      });

      if (regError) throw regError;

      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setGoogleLoading(true);
    const { error: googleError } = await loginWithGoogle();
    if (googleError) {
      setError(googleError.message || 'Google signup failed');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <img
              src={logo}
              alt="Logo"
              className="login-logo"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <h2 className="brand-title">Join Us!</h2>
            <p className="brand-subtitle">Create your free account</p>

            <div className="login-features">
              <div className="feature-item">
                <span className="feature-icon">📚</span> 10,000+ Papers
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span> Curated Content
              </div>
              <div className="feature-item">
                <span className="feature-icon">🆓</span> 100% Free Forever
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-header">
              <h2>Create Account</h2>
              <p>Sign up to get started</p>
            </div>

            {error && (
              <div className="alert-custom alert-error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            {success && (
              <div className="alert-custom alert-success">
                <i className="fas fa-check-circle"></i> {success}
              </div>
            )}

            {/* GOOGLE SIGNUP BUTTON */}
            <button
              type="button"
              className="google-login-btn"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <>
                  <span className="spinner"></span> Redirecting...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <i className="fas fa-user"></i> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  disabled={loading || googleLoading}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  disabled={loading || googleLoading}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-phone"></i> Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, mobile: val });
                  }}
                  placeholder="10-digit mobile"
                  required
                  disabled={loading || googleLoading}
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-university"></i> University
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  disabled={loading || googleLoading}
                >
                  <option value="" disabled>
                    Select university
                  </option>
                  {universityOptions.map((u, i) => (
                    <option key={i} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-graduation-cap"></i> Course
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={loading || googleLoading}
                >
                  <option value="" disabled>
                    Select course
                  </option>
                  {courseOptions.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i> Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    required
                    disabled={loading || googleLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPass(!showPass)}
                  >
                    <i
                      className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i> Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  disabled={loading || googleLoading}
                />
              </div>

              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i> Sign Up
                  </>
                )}
              </button>
            </form>

            <div className="register-link">
              Already have account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;