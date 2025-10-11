import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { healthRouter } from './routes/health';
import { linksRouter } from './routes/links';

const logger = pino({
    transport: { target: 'pino-pretty' },
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/', healthRouter);
app.use('/links', linksRouter);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    _req.log?.error({ err }, 'Unhandled Error');
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
});

app.listen(Number(env.PORT), () => {
    logger.info(`Server is running on http://localhost:${env.PORT}`);
})
