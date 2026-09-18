import 'dotenv/config';

const normalizeUrl = (url) => url.trim().replace(/\/+$/, '');

const configuredOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(normalizeUrl)
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://examsaarthi.com',
  'https://www.examsaarthi.com',
  'https://exam-saarthi-1.onrender.com',
];

export const FRONTEND_ORIGINS = [...new Set([...configuredOrigins, ...defaultOrigins])];

export const FRONTEND_URL = normalizeUrl(
  process.env.FRONTEND_PRIMARY_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://examsaarthi.com' : configuredOrigins[0] || 'http://localhost:5173')
);