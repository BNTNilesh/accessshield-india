import { loadLocalEnv } from './config/env';

loadLocalEnv();

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import Redis from 'ioredis';
import pinoHttp from 'pino-http';
import { createDb } from '@accessshield/db';
import { loadSecrets } from './config/secrets';
import { logger } from './lib/logger';
import { sendProblem } from './lib/problem-details';
import { createAuthMiddleware } from './middleware/auth';
import { requestIdMiddleware } from './middleware/request-id';
import { createHealthRouter } from './routes/health';
import { scansRouter } from './routes/scans';

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const secrets = await loadSecrets();
  const db = createDb(secrets.databaseUrl);
  const redis = new Redis(secrets.redisUrl, { maxRetriesPerRequest: 3, lazyConnect: true });

  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000' }));
  app.use(express.json({ limit: '1mb' }));
  app.use(requestIdMiddleware);
  app.use(
    pinoHttp({
      logger,
      genReqId: (req) => req.id,
      customProps: (req) => ({ requestId: req.id }),
    }),
  );

  const healthRouter = createHealthRouter(db, redis);
  app.use(healthRouter);

  const authMiddleware = createAuthMiddleware(secrets.supabaseUrl);
  app.use('/api/v1', authMiddleware);
  app.use('/api/v1/scans', scansRouter);

  app.use((_req, res) => {
    sendProblem(res, 404, 'not-found', 'Resource not found');
  });

  app.use(
    (err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
      logger.error({ err, requestId: req.id }, 'Unhandled error');
      sendProblem(res, 500, 'internal-error', 'Internal server error');
    },
  );

  await redis.connect();

  const server = app.listen(PORT, () => {
    logger.info({ port: PORT, version: process.env.npm_package_version }, 'API server started');
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.fatal(
        { port: PORT },
        'Port already in use — run "pnpm dev:stop" or kill the other API process',
      );
    } else {
      logger.fatal({ err }, 'Failed to start API server');
    }
    process.exit(1);
  });
}

bootstrap().catch((err: unknown) => {
  logger.fatal({ err }, 'Failed to start API server');
  process.exit(1);
});
