import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export * from './schema';
export {
  lookupUserByAuthId,
  lookupUserClaimsByAuthId,
  type ResolvedApplicationUser,
  type ResolvedUserClaims,
} from './user-claims';

export function createDb(connectionString: string) {
  const client = postgres(connectionString, { max: 10 });
  return drizzle(client, { schema });
}

export type Database = ReturnType<typeof createDb>;
