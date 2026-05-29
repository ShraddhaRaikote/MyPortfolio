/**
 * Push JSON documents to Sanity without using Studio UI.
 * Edit files in studio/content/*.json then: npm run push:content
 */
import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const envPath = join(root, '.env');
const contentDir = join(root, 'content');

function loadEnvFile() {
  try {
    const contents = readFileSync(envPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key && !(key in process.env)) {
        process.env[key] = rest.join('=');
      }
    }
  } catch {
    /* optional */
  }
}

async function configureTls() {
  if (process.platform !== 'win32') return;
  process.env.NODE_USE_SYSTEM_CA ??= '1';
  try {
    const winCa = await import('win-ca');
    const inject = winCa.default?.inject ?? winCa.inject;
    if (typeof inject === 'function') inject('+');
  } catch {
    /* optional */
  }
}

loadEnvFile();
await configureTls();

const token = process.env.SANITY_API_TOKEN?.trim();
if (!token || /your_write_token|paste.*token/i.test(token) || token.length < 40) {
  console.error('Add a real SANITY_API_TOKEN to studio/.env (sanity.io/manage → API → Tokens).');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'cq64slan',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const files = readdirSync(contentDir).filter((f) => f.endsWith('.json'));
if (!files.length) {
  console.error('No JSON files in studio/content/');
  process.exit(1);
}

const tx = client.transaction();
for (const file of files) {
  const doc = JSON.parse(readFileSync(join(contentDir, file), 'utf8'));
  if (!doc._id || !doc._type) {
    console.error(`${file}: must include _id and _type`);
    process.exit(1);
  }
  tx.createOrReplace(doc);
  console.log('Queued:', doc._type, doc._id);
}

try {
  await tx.commit();
  console.log('\nDone. Reload Studio — fields should show your saved values.');
} catch (err) {
  console.error('Push failed:', err.message);
  if (/issuer certificate/i.test(err.message)) {
    console.error('Run: $env:NODE_USE_SYSTEM_CA="1"; npm run push:content');
  }
  process.exit(1);
}
