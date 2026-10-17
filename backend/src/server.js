import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import { requireAuth } from './middleware/authMiddleware.js'; // ← नया सुरक्षा मिडिलवेयर इम्पोर्ट किया
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
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// =====================================================
// BODY PARSERS
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

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Exam Saarthi API is running',
    health: '/api/health',
  });
});

// इस रूट को अब requireAuth मिडिलवेयर लगाकर पूरी तरह सुरक्षित (PROTECTED) कर दिया गया है
app.get('/api', requireAuth, (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    message: 'Exam Saarthi API is running SECURELY!',
    user: {
      id: req.user.id,
      email: req.user.email,
    }
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

  if (err.status === 431 || err.code === 'HPE_HEADER_OVERFLOW') {
    return res.status(431).json({
      success: false,
      message: 'Request header too large. Please clear cookies and try again.',
      hint: 'Frontend se purani cookies clear karein',
    });
  }

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
// SERVER CONFIGURATION
// =====================================================
const server = http.createServer(
  {
    maxHeaderSize: 32768,
    requestTimeout: 120000,
    headersTimeout: 115000,
    keepAliveTimeout: 65000,
  },
  app
);

server.maxHeadersCount = 2000;

// =====================================================
// START SERVER
// =====================================================
server.listen(PORT, () => {
  console.log('');
  console.log('════════════════════════════════════════════');
  console.log(`🚀 Backend Server Started Securely`);
  console.log('════════════════════════════════════════════');
  console.log(`📍 URL:         http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend:    ${FRONTEND_URL}`);
  console.log(`💚 Health:      http://localhost:${PORT}/api/health`);
  console.log('════════════════════════════════════════════');
  console.log('');
});

// =====================================================
// GRACEFUL SHUTDOWN
// =====================================================
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
