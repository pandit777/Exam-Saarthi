import { createClient } from '@supabase/supabase-js';

// =====================================================
// FRONTEND SUPABASE CLIENT
// =====================================================
// ⭐ localStorage use karta hai (cookies nahi) — 431 error fix
// Cookies use karne se request headers bade hote hain aur 431 aata hai

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate env (development mein helpful)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Missing Supabase env variables. Check .env file:\n' +
    '   VITE_SUPABASE_URL\n' +
    '   VITE_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // ⭐⭐⭐ 431 FIX — Cookies ki jagah localStorage use karein ⭐⭐⭐
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,

    // Custom storage key (default key lambi hoti hai)
    storageKey: 'examsaarthi-auth',

    // Session automatically refresh karein
    autoRefreshToken: true,

    // Session ko localStorage mein persist karein
    persistSession: true,

    // URL se session detect karein (OAuth callback ke liye)
    detectSessionInUrl: true,

    // Modern PKCE flow (secure)
    flowType: 'pkce',
  },

  // Global fetch options
  global: {
    headers: {
      'X-Client-Info': 'examsaarthi-web',
    },
  },

  // Database schema
  db: {
    schema: 'public',
  },
});

export default supabase;
