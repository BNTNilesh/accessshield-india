import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export interface AppSecrets {
  databaseUrl: string;
  redisUrl: string;
  rabbitmqUrl: string;
  supabaseJwtSecret: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
}

const SECRET_KEYS = [
  'DATABASE_URL',
  'REDIS_URL',
  'RABBITMQ_URL',
  'SUPABASE_JWT_SECRET',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

function fromEnv(): AppSecrets {
  const missing = SECRET_KEYS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    databaseUrl: process.env.DATABASE_URL!,
    redisUrl: process.env.REDIS_URL!,
    rabbitmqUrl: process.env.RABBITMQ_URL!,
    supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET!,
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY!,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  };
}

async function fromAwsSecretsManager(secretId: string, region: string): Promise<AppSecrets> {
  const client = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId: secretId });
  const response = await client.send(command);

  if (!response.SecretString) {
    throw new Error(`Secret ${secretId} has no string value`);
  }

  const parsed = JSON.parse(response.SecretString) as Record<string, string>;
  const missing = SECRET_KEYS.filter((key) => !parsed[key]);
  if (missing.length > 0) {
    throw new Error(`AWS secret missing keys: ${missing.join(', ')}`);
  }

  return {
    databaseUrl: parsed['DATABASE_URL'] as string,
    redisUrl: parsed['REDIS_URL'] as string,
    rabbitmqUrl: parsed['RABBITMQ_URL'] as string,
    supabaseJwtSecret: parsed['SUPABASE_JWT_SECRET'] as string,
    supabaseUrl: parsed['SUPABASE_URL'] as string,
    supabaseAnonKey: parsed['SUPABASE_ANON_KEY'] as string,
    supabaseServiceRoleKey: parsed['SUPABASE_SERVICE_ROLE_KEY'] as string,
  };
}

/**
 * Load secrets at startup.
 * Local dev: .env.local via dotenv. Production: AWS Secrets Manager.
 * Secrets are never logged.
 */
export async function loadSecrets(): Promise<AppSecrets> {
  const isProduction = process.env.NODE_ENV === 'production';
  const secretId = process.env.AWS_SECRET_ID;
  const region = process.env.AWS_REGION ?? 'ap-south-1';

  if (isProduction && secretId) {
    return fromAwsSecretsManager(secretId, region);
  }

  return fromEnv();
}
