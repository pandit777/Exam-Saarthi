const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/([^:]\/)\/+/g, '$1').replace(/\/+$/, '');

const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  // ===== REGISTER =====
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  // ===== LOGIN =====
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  requestPasswordOtp: async (email) => {
    const res = await fetch(`${API_URL}/auth/password-reset/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unable to send OTP');
    return data;
  },

  verifyPasswordOtp: async (email, otp) => {
    const res = await fetch(`${API_URL}/auth/password-reset/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unable to verify OTP');
    return data;
  },

  updatePasswordWithOtp: async (email, resetToken, newPassword) => {
    const res = await fetch(`${API_URL}/auth/password-reset/update-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, resetToken, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unable to update password');
    return data;
  },

  // ===== GOOGLE - Get OAuth URL =====
  getGoogleUrl: async () => {
    const res = await fetch(`${API_URL}/auth/google`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Google login failed');
    return data;
  },

  // ===== GOOGLE - OAuth callback sync =====
  oauthCallback: async (accessToken) => {
    const res = await fetch(`${API_URL}/auth/oauth-callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: accessToken }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OAuth failed');
    return data;
  },

  // ===== LOGOUT =====
  logout: async () => {
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
    } catch (err) {
      // Silent fail
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // ===== GET ME =====
  getMe: async () => {
    const token = localStorage.getItem('auth_token');
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    });
    return res.json();
  },

  // ===== ADMIN: GET USERS =====
  getAdminUsers: async () => {
    const res = await fetch(`${API_URL}/auth/admin/users`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load users');
    return data;
  },

  // ===== ADMIN: CREATE PAPER =====
  createPaper: async (paperData) => {
    const res = await fetch(`${API_URL}/auth/admin/papers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(paperData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save paper');
    return data;
  },

  // ===== ADMIN: RESET USER PASSWORD =====
  resetUserPassword: async (userId, newPassword) => {
    const res = await fetch(`${API_URL}/auth/admin/reset-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to reset password');
    return data;
  },

  // ===== ADMIN: GET USER LOGS =====
  getAdminLogs: async () => {
    const res = await fetch(`${API_URL}/auth/admin/logs`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load logs');
    return data;
  },
};