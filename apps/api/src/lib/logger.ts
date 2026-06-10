import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      'token',
      'secret',
      'apiKey',
      'DATABASE_URL',
      'REDIS_URL',
      'RABBITMQ_URL',
      'SUPABASE_JWT_SECRET',
    ],
    censor: '[REDACTED]',
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
});
