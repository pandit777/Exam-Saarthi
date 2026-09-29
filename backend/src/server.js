import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import { FRONTEND_ORIGINS, FRONTEND_URL } from './utils/frontendConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================================
// TRUST PROXY (Render ke liye zaroori)
// =====================================================
app.set('trust proxy', 1);

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

// =====================================================
// CORS CONFIGURATION
// =====================================================
console.log('');
console.log('════════════════════════════════════════════');
console.log('🌐 CORS Configuration');
console.log('════════════════════════════════════════════');
console.log('✅ Allowed Origins:');
FRONTEND_ORIGINS.forEach((o) => console.log(`   → ${o}`));
console.log('════════════════════════════════════════════');
console.log('');

const corsOptions = {
  origin: (origin, callback) => {
    // Postman / curl / same-origin requests ke liye
    if (!origin) {
      console.log('🌐 Request with no origin (Postman/curl) - ALLOWED');
      return callback(null, true);
    }

    if (FRONTEND_ORIGINS.includes(origin)) {
      console.log(`✅ CORS ALLOWED: ${origin}`);
      return callback(null, true);
    }

    console.log(`❌ CORS BLOCKED: ${origin}`);
    console.log(`   Allowed list: ${FRONTEND_ORIGINS.join(', ')}`);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Preflight requests handle karein (Express 5 compatible)
app.options(/.*/, cors(corsOptions));

// =====================================================
// BODY PARSERS
// =====================================================
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// =====================================================
// RATE LIMITING
// =====================================================
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many attempts. Try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// =====================================================
// ROUTES
// =====================================================
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Exam Saarthi API is running',
    health: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    allowedOrigins: FRONTEND_ORIGINS,
  });
});

// =====================================================
// 404 HANDLER
// =====================================================
app.use((req, res) => {
  console.log(`⚠️  404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);

  // CORS error ko clear message ke saath bhejein
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: err.message,
      hint: 'Check FRONTEND_URLS env variable on Render',
    });
  }

  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
});

// =====================================================
// START SERVER
// =====================================================
app.listen(PORT, () => {
  console.log('');
  console.log('════════════════════════════════════════════');
  console.log(`🚀 Backend Server Started`);
  console.log('════════════════════════════════════════════');
  console.log(`📍 URL:         http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend:    ${FRONTEND_URL}`);
  console.log(`💚 Health:      http://localhost:${PORT}/api/health`);
  console.log('════════════════════════════════════════════');
  console.log('');
});
