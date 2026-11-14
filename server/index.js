import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { pathToFileURL } from 'node:url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import testimonialRoutes, { publicTestimonials } from './routes/testimonialRoutes.js';
import linkedinRoutes from './routes/linkedinRoutes.js';
import experienceRoutes, { publicExperience } from './routes/experienceRoutes.js';

const app = express();
app.disable('x-powered-by');
// Vercel supplies the client address through one trusted proxy hop.
if (process.env.VERCEL) app.set('trust proxy', 1);
app.use(helmet());
const origins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim());
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || origins.includes(origin));
    },
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: false }));
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    mongodb: connected ? 'connected' : 'disconnected',
  });
});
app.use(
  '/api',
  rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false })
);
const writeLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: req => req.method !== 'POST',
});
app.use('/api/users/login', writeLimiter);
app.use('/api/comments', writeLimiter);
app.get('/api/experience', publicExperience);
app.get('/api/testimonials', publicTestimonials);
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res
      .status(503)
      .json({ message: 'Content service is temporarily unavailable. Please try again later.' });
  }
});
app.use(seoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status || 500;
  res.status(status).json({
    message:
      status === 413
        ? 'Request is too large'
        : status === 400
          ? 'Invalid request'
          : 'An unexpected error occurred',
  });
});
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  app.listen(process.env.PORT || 5000, () => console.log('Portfolio API is running'));
}
export default app;
