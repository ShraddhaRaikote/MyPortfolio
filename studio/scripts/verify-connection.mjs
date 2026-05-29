/**
 * Quick Sanity connectivity check for project cq64slan.
 * Run: node scripts/verify-connection.mjs
 */
const projectId = 'cq64slan';
const dataset = 'production';
const apiVersion = '2024-01-01';

const query = encodeURIComponent('*[_type in ["skill","profile","siteSettings"]]{_type}');
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

console.log('Testing Sanity API...');
console.log('Project:', projectId);
console.log('Dataset:', dataset);
console.log('');

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const body = await res.json();

  if (!res.ok) {
    console.error('FAILED — HTTP', res.status);
    console.error(JSON.stringify(body, null, 2));
    process.exit(1);
  }

  console.log('OK — API reachable in', body.ms ?? '?', 'ms');
  const counts = {};
  for (const row of body.result ?? []) {
    counts[row._type] = (counts[row._type] ?? 0) + 1;
  }
  console.log('Documents found:', Object.keys(counts).length ? counts : '(none — run npm run seed after adding SANITY_API_TOKEN)');

  console.log('\n--- If Studio shows "Could not fetch" or "Trying to connect" ---');
  console.log('1. sanity.io/manage → project cq64slan → API → CORS origins');
  console.log('   ADD these (Allow credentials = ON):');
  console.log('   - http://localhost:3333');
  console.log('   - http://127.0.0.1:3333');
  console.log('   - http://localhost:4200');
  console.log('2. sanity.io/manage → Members — your account must be invited to the project');
  console.log('3. Use http://localhost:3333 in the browser (not 127.0.0.1) after adding CORS');
  console.log('4. npm run seed (needs SANITY_API_TOKEN in studio/.env)');
} catch (err) {
  console.error('FAILED — network error:', err.message);
  console.error('Check firewall/VPN or try another network.');
  process.exit(1);
}
