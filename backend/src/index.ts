// Trigger Vercel build after settings update
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bookingsRouter from './routes/bookings';
import contactRouter from './routes/contact';
import { errorHandler } from './middleware/error';
import { initDb } from './config/db';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = '127.0.0.1'; // MUST listen on localhost/127.0.0.1 for local security boundary

// Middlewares
app.use(helmet()); // Set secure HTTP headers
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.CORS_ORIGIN,
      ].filter(Boolean);
      // Allow requests with no origin (like Postman/curl) or from allowed origins
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON payloads

// Root status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Royston Lynxx API is running securely',
    timestamp: new Date().toISOString(),
  });
});

// Route Mounts
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);

// Global Error Handler
app.use(errorHandler);

export { app };

function startServer(): void {
  initDb()
    .then(() => {
      app.listen(PORT, HOST, () => {
        console.log(`[Server] Royston Lynxx backend listening on http://${HOST}:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('[Server] Failed to initialize database:', err);
      process.exit(1);
    });
}

if (require.main === module) {
  startServer();
}
