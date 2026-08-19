// Vercel serverless function entry point
// Uses pre-compiled dist/ output from TypeScript build (npm run build)
const { app } = require('../dist/index');
const { initDb } = require('../dist/config/db');

let databaseReady;

module.exports = function handler(req, res) {
  databaseReady = databaseReady || initDb();

  databaseReady
    .then(() => app(req, res))
    .catch((error) => {
      console.error('[Server] Failed to initialize database:', error);
      res.status(500).json({ status: 'error', message: 'Database initialization failed' });
    });
};
