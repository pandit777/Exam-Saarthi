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
// SECURITY MIDDLEWARE
// =====================================================
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || FRONTEND_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin is not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10kb' }));
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
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
});

// =====================================================
// START
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