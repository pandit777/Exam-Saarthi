const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/([^:]\/)\/+/g, '$1').replace(/\/+$/, '');
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token || null;
};

const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
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
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });
    } catch (err) {
      // Silent fail
    }
    authToken = null;
  },

  // ===== GET ME =====
  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    });
    return res.json();
  },

  // ===== UPDATE PROFILE =====
  updateProfile: async (profileData) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Profile update failed');
    return data;
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

  // ===== ADMIN: GET ALL PAPERS =====
  getAdminPapers: async () => {
    const res = await fetch(`${API_URL}/auth/admin/papers`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load papers');
    return data;
  },

  // ===== GET PAPERS FOR A COURSE =====
  getPapers: async (courseName) => {
    const params = new URLSearchParams({ course: courseName });
    const res = await fetch(`${API_URL}/auth/papers?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load papers');
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