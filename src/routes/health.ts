import { Router, type Request, type Response } from 'express';

export const healthRouter: Router = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: 'bookmark-vault-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
