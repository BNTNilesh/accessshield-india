/**
 * Worker Entry Point
 *
 * Standalone entry point for running the scan worker process.
 * Used for local development and ECS/container deployment.
 *
 * Usage: pnpm --filter @accessshield/api dev:worker
 */

import { loadLocalEnv } from '../config/env';

loadLocalEnv();

import { logger } from '../lib/logger';
import { shutdown, startWorker } from './worker';

logger.info('Starting AccessShield scan worker...');

const gracefulShutdown = async () => {
  await shutdown();
  process.exit(0);
};

process.on('SIGTERM', () => void gracefulShutdown());
process.on('SIGINT', () => void gracefulShutdown());

startWorker().catch((err) => {
  logger.fatal({ err }, 'Failed to start scan worker');
  process.exit(1);
});
