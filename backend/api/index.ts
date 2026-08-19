import { Request, Response } from 'express';
import { app } from '../src/index';
import { initDb } from '../src/config/db';

let databaseReady: Promise<void> | undefined;

export default function handler(req: Request, res: Response): void {
  databaseReady ??= initDb();

  databaseReady
    .then(() => app(req, res))
    .catch((error: unknown) => {
      console.error('[Server] Failed to initialize database:', error);
      res.status(500).json({ status: 'error', message: 'Database initialization failed' });
    });
}