import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';
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
  maxAge: 86400, // 24 hours — preflight cache
};

app.use(cors(corsOptions));

// Preflight requests handle karein (Express 5 compatible)
app.options(/.*/, cors(corsOptions));

// =====================================================
// BODY PARSERS (431 error ke liye limits badhaye)
// =====================================================
app.use(
  express.json({
    limit: '2mb',
    parameterLimit: 10000,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '2mb',
    parameterLimit: 10000,
  })
);

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

  // 431 error — Request Header Fields Too Large
  if (err.status === 431 || err.code === 'HPE_HEADER_OVERFLOW') {
    return res.status(431).json({
      success: false,
      message: 'Request header too large. Please clear cookies and try again.',
      hint: 'Frontend se purani cookies clear karein',
    });
  }

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
// SERVER (431 fix + Node.js timeout rules)
// =====================================================
// Node.js Rule: headersTimeout <= requestTimeout
// keepAliveTimeout hamesha headersTimeout se chota
const server = http.createServer(
  {
    maxHeaderSize: 32768,      // 32KB (default 16KB thi) — 431 fix
    requestTimeout: 120000,    // 120s (2 min) — sabse bada
    headersTimeout: 115000,    // 115s — requestTimeout se CHOTA
    keepAliveTimeout: 65000,   // 65s — Render load balancer ke liye
  },
  app
);

// Extra safety: max headers count
server.maxHeadersCount = 2000;

// =====================================================
// START SERVER
// =====================================================
server.listen(PORT, () => {
  console.log('');
  console.log('════════════════════════════════════════════');
  console.log(`🚀 Backend Server Started`);
  console.log('════════════════════════════════════════════');
  console.log(`📍 URL:         http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend:    ${FRONTEND_URL}`);
  console.log(`💚 Health:      http://localhost:${PORT}/api/health`);
  console.log(`📦 Max Header:  32KB`);
  console.log(`⏱️  Timeouts:    req=120s, headers=115s, keepAlive=65s`);
  console.log('════════════════════════════════════════════');
  console.log('');
});

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
