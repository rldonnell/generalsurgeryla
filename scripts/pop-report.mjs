#!/usr/bin/env node
// Page Optimizer Pro report runner.
// Usage: node scripts/pop-report.mjs <url> "<keyword>" [--location "United States, California, CA, Los Angeles"] [--nlp]
// Needs POP_API_KEY in .env.local (never commit it). Each run costs about 2 API calls
// (--nlp adds 6; EEAT option not wired up yet). Reports are saved to pop-reports/ as JSON plus a readable summary.
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://app.pageoptimizer.pro/api';

function loadKey() {
  if (process.env.POP_API_KEY) return process.env.POP_API_KEY.trim();
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const m = env.match(/^POP_API_KEY\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  } catch {}
  return '';
}

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const pos = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && ['--location', '--task', '--terms-task', '--language'].includes(args[i - 1])));
const [targetUrl, keyword] = pos;
const location = opt('--location', 'United States, California, CA, Los Angeles');
const language = opt('--language', 'english');

if (!targetUrl || !keyword) { console.error('Usage: node scripts/pop-report.mjs <url> "<keyword>" [--location "..."] [--nlp]'); process.exit(1); }
const apiKey = loadKey();
if (!apiKey) { console.error('Missing POP_API_KEY. Add it to .env.local (POP_API_KEY=...).'); process.exit(1); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function post(p, body) {
  const res = await fetch(BASE + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ apiKey, ...body }) });
  const j = await res.json().catch(() => ({}));
  if (j.status === 'FAILURE' || j.code >= 400 || !j.taskId) throw new Error(`${p}: ${j.msg || JSON.stringify(j).slice(0, 300)}`);
  return j;
}
async function poll(taskId, label) {
  for (let i = 0; i < 120; i++) {
    const res = await fetch(`${BASE}/task/${taskId}/results/`);
    const j = await res.json().catch(() => ({}));
    if (j.status === 'FAILURE') throw new Error(`${label}: ${j.msg || 'task failed'}`);
    if (j.status === 'SUCCESS' || j.report || j.date_done) return j.report ? j : { ...j, ...(j.result || {}) };
    if (i % 6 === 0) console.log(`\n[${label} ${taskId}] ${JSON.stringify(j).slice(0, 300)}`);
    process.stdout.write(`\r${label}: ${j.value ?? '?'}% ${j.msg ?? ''}`.padEnd(70));
    await sleep(5000);
  }
  throw new Error(`${label}: timed out`);
}

// Free lookups: make sure location and language are spelled the way POP expects.
const locs = await (await fetch(`${BASE}/google-search-locations/`)).json();
if (!locs.includes(location)) {
  const close = locs.filter((l) => l.includes('Los Angeles') && l.startsWith('United States')).slice(0, 8);
  console.error(`Location "${location}" is not in POP's list. Closest:\n  ${close.join('\n  ')}`); process.exit(1);
}
const langs = await (await fetch(`${BASE}/available-languages/`)).json();
if (!langs.includes(language)) { console.error(`Language "${language}" not found in POP's list.`); process.exit(1); }

console.log(`Keyword: ${keyword}\nPage: ${targetUrl}\nLocation: ${location}`);
if (opt('--task')) { const j = await poll(opt('--task'), 'Resume'); fs.mkdirSync('pop-reports', { recursive: true }); const f = path.join('pop-reports', `task-${opt('--task')}.json`); fs.writeFileSync(f, JSON.stringify(j, null, 2)); console.log('Saved ' + f); process.exit(0); }
const termsTask = opt('--terms-task') || (await post('/expose/get-terms/', { keyword, locationName: location, targetUrl, targetLanguage: language })).taskId;
const terms = await poll(termsTask, 'Terms');
console.log('\nTerms ready.');

const t2 = await post('/expose/create-report/', {
  prepareId: terms.prepareId, variations: terms.variations, lsaPhrases: terms.lsaPhrases,
  considerOverOptimization: 1, ...(flag('--nlp') ? { googleNlpCalculation: 1 } : {}),
});
console.log('\ncreate-report response:', JSON.stringify(t2).slice(0, 300));
const report = await poll(t2.taskId, 'Report');
console.log('\nReport ready.');

const slug = new URL(targetUrl).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
fs.mkdirSync('pop-reports', { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const base = path.join('pop-reports', `${slug}-${stamp}`);
fs.writeFileSync(base + '.json', JSON.stringify({ keyword, targetUrl, location, terms, report }, null, 2));
console.log(`Saved ${base}.json`);
