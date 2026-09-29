const API_URL = (import.meta.env.VITE_API_URL || '')
  .replace(/([^:]\/)\/+/g, '$1')
  .replace(/\/+$/, '');

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

// ⭐ Cookies clear karne ka helper (431 fix)
const clearAllCookies = () => {
  if (typeof document === 'undefined') return;

  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!name) return;

    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    const paths = ['/', ''];
    const domains = [
      '',
      `;domain=${window.location.hostname}`,
      `;domain=.${window.location.hostname}`,
      ';domain=.examsaarthi.com',
      ';domain=examsaarthi.com',
      ';domain=.onrender.com',
    ];

    paths.forEach((path) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=;${expire};path=${path}${domain}`;
      });
    });
  });
};

export const api = {
  // ===== REGISTER =====
  register: async (userData) => {
    let res;
    try {
      res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',  // ⭐ Cookies bhejne ke liye
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      throw new Error(
        'Unable to connect to the server. Please try again.'
      );
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  // ===== LOGIN =====
  login: async (email, password) => {
    let res;
    try {
      res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',  // ⭐ Cookies bhejne ke liye
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      throw new Error(
        'Unable to connect to the server. Please try again.'
      );
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // ===== GOOGLE - Get OAuth URL =====
  getGoogleUrl: async () => {
    const res = await fetch(`${API_URL}/auth/google`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Google login failed');
    return data;
  },

  // ===== GOOGLE - OAuth callback sync =====
  oauthCallback: async (accessToken) => {
    const res = await fetch(`${API_URL}/auth/oauth-callback`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: accessToken }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'OAuth failed');
    return data;
  },

  // ===== LOGOUT (431 fix ke saath) =====
  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {},
      });
    } catch (err) {
      // Silent fail — cookies fir bhi clear karni hain
    }

    // ⭐⭐⭐ SAB cookies clear karein (431 error ka asli fix) ⭐⭐⭐
    clearAllCookies();

    // LocalStorage aur SessionStorage clear karein
    if (typeof localStorage !== 'undefined') localStorage.clear();
    if (typeof sessionStorage !== 'undefined') sessionStorage.clear();

    // Token reset
    authToken = null;
  },

  // ===== GET ME =====
  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
      headers: authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {},
    });
    return res.json();
  },

  // ===== UPDATE PROFILE =====
  updateProfile: async (profileData) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...profileData,
        access_token: authToken,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Profile update failed');
    return data;
  },

  // ===== ADMIN: GET USERS =====
  getAdminUsers: async () => {
    const res = await fetch(`${API_URL}/auth/admin/users`, {
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load papers');
    return data;
  },

  // ===== GET PAPERS FOR A COURSE =====
  getPapers: async (courseName) => {
    const params = new URLSearchParams({ course: courseName });
    const res = await fetch(`${API_URL}/auth/papers?${params.toString()}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load papers');
    return data;
  },

  // ===== ADMIN: RESET USER PASSWORD =====
  resetUserPassword: async (userId, newPassword) => {
    const res = await fetch(`${API_URL}/auth/admin/reset-password`, {
      method: 'POST',
      credentials: 'include',
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
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load logs');
    return data;
  },
};
