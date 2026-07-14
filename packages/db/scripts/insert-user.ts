import * as dotenv from 'dotenv';
import * as path from 'path';
import { createDb } from '../src/index.js';
import { users, organisations } from '../src/schema.js';
import { eq } from 'drizzle-orm';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL not set (expected in .env.local at repo root)');
  }
  const db = createDb(dbUrl);

  const email = 'pravinbntsoft@gmail.com';
  const authUserId = 'af10fe7b-4eeb-4a08-811e-7e0765d87574';
  const orgId = '0ab5da8a-276a-4a6c-9350-bdb39dfba174';

  try {
    // 1. Create org if not exists
    const orgs = await db.select().from(organisations).where(eq(organisations.id, orgId));
    if (orgs.length === 0) {
      console.log('Creating organisation...');
      await db.insert(organisations).values({
        id: orgId,
        name: 'Pravin Bntsoft',
        slug: 'pravin-bntsoft',
        planTier: 'professional',
        billingEmail: email,
        isActive: true,
      });
      console.log('Organisation created.');
    } else {
      console.log('Organisation already exists.');
    }

    // 2. Create user if not exists
    const existingUsers = await db.select().from(users).where(eq(users.authUserId, authUserId));
    if (existingUsers.length === 0) {
      console.log('Creating user...');
      await db.insert(users).values({
        organisationId: orgId,
        authUserId: authUserId,
        email: email,
        fullName: 'pravin',
        role: 'customer_admin',
        isActive: true,
      });
      console.log('User created successfully!');
    } else {
      console.log('User already exists.');
    }
  } catch (err) {
    console.error('Error inserting user:', err instanceof Error ? err.message : err);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Unhandled Error:', err);
  process.exit(1);
});
