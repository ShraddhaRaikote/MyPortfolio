/**
 * Edit Profile in the terminal (works when Studio UI cannot save).
 *
 *   npm run edit:profile
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

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
if (!token?.startsWith('sk')) {
  console.error('Add SANITY_API_TOKEN=sk... to studio/.env');
  process.exit(1);
}

const client = createClient({
  projectId: 'cq64slan',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const rl = readline.createInterface({ input, output });

async function prompt(label, current) {
  const hint = current ? ` [${current}]` : '';
  const answer = (await rl.question(`${label}${hint}: `)).trim();
  return answer || current || '';
}

try {
  const existing =
    (await client.fetch(`*[_id == "profile"][0]`)) ||
    (await client.fetch(`*[_type == "profile"][0]`));

  if (!existing) {
    console.error('No profile document found. Run: npm run seed');
    process.exit(1);
  }

  console.log('\nEditing Profile (Enter keeps current value)\n');

  const patch = {
    name: await prompt('Name', existing.name),
    title: await prompt('Job Title', existing.title),
    tagline: await prompt('Tagline', existing.tagline),
    shortBio: await prompt('Short Bio', existing.shortBio),
    location: await prompt('Location', existing.location),
    yearsExp: Number(await prompt('Years of experience', String(existing.yearsExp ?? ''))) || existing.yearsExp,
    openToWork: (await prompt('Open to work (yes/no)', existing.openToWork ? 'yes' : 'no'))
      .toLowerCase()
      .startsWith('y'),
  };

  await client.patch(existing._id).set(patch).commit();
  console.log('\nSaved. Reload Studio to see changes.');
} catch (err) {
  console.error('Failed:', err.message);
  process.exit(1);
} finally {
  rl.close();
}
