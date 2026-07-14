import * as dotenv from 'dotenv';
import * as path from 'path';
import { createDb } from '../src/index.js';
import { users } from '../src/schema.js';
import { eq } from 'drizzle-orm';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL not set (expected in .env.local at repo root)');
  }

  const db = createDb(dbUrl);

  const email = 'pravinbntsoft@gmail.com';
  console.log(`Checking user: ${email}`);
  try {
    const userList = await db.select().from(users).where(eq(users.email, email));
    if (userList.length === 0) {
      console.log('User not found in DB.');
    } else {
      console.log('User found:');
      console.log(JSON.stringify(userList[0], null, 2));
    }
  } catch (err) {
    console.error('DB Query Error:', err instanceof Error ? err.message : err);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
