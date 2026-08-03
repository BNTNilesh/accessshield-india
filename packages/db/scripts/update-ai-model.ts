import * as dotenv from 'dotenv';
import * as path from 'path';
import { createDb } from '../src/index.js';
import { organisations } from '../src/schema.js';

dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

async function main() {
  const dbUrl =
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/accessshield';
  const db = createDb(dbUrl);

  try {
    await db.update(organisations).set({
      aiProvider: 'local',
      aiModel: 'Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF',
    });
    console.log(
      'Successfully updated all organisations to local Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF',
    );
  } catch (err) {
    console.error('Error updating DB organisation AI model:', err);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Unhandled Error:', err);
  process.exit(1);
});
