#!/usr/bin/env node
// Run POP reports for many pages, one after another, and write a ranked summary.
// Usage: node scripts/pop-batch.mjs [--base https://generalsurgeryla.vercel.app] [--keywords pop-keywords.json] [--force] [--only slug]
// Each page costs about 2 POP API calls and takes 3 to 6 minutes. Run it in your own terminal and leave it going.
// Pages already scored today are skipped unless you pass --force, so you can stop and resume safely.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const base = opt('--base', 'https://generalsurgeryla.vercel.app').replace(/\/$/, '');
const file = opt('--keywords', 'pop-keywords.json');
const only = opt('--only');
const force = args.includes('--force');
const stamp = new Date().toISOString().slice(0, 10);

const pages = JSON.parse(fs.readFileSync(file, 'utf8')).filter((p) => !p.skip && (!only || p.path.includes(only)));
const slugOf = (url) => new URL(url).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
const rows = [];

for (const [i, p] of pages.entries()) {
  const url = base + p.path;
  const out = `pop-reports/${slugOf(url)}-${stamp}.json`;
  console.log(`\n[${i + 1}/${pages.length}] ${url}  ("${p.keyword}")`);
  if (force || !fs.existsSync(out)) {
    const r = spawnSync('node', ['scripts/pop-report.mjs', url, p.keyword], { stdio: 'inherit' });
    if (r.status !== 0) { console.error('  failed, moving on'); rows.push({ path: p.path, keyword: p.keyword, error: true }); continue; }
  } else console.log('  already scored today, skipping');
  try {
    const d = JSON.parse(fs.readFileSync(out, 'utf8')).report.report;
    const c = d.cleanedContentBrief;
    rows.push({ path: p.path, keyword: p.keyword, score: c.pageScore.pageScore, words: d.wordCount.current, targetWords: d.wordCount.target });
  } catch { rows.push({ path: p.path, keyword: p.keyword, error: true }); }
}

rows.sort((a, b) => (a.score ?? -1) - (b.score ?? -1));
const csv = ['page,keyword,pop_score,words,target_words', ...rows.map((r) => `${r.path},"${r.keyword}",${r.error ? 'error' : r.score},${r.words ?? ''},${r.targetWords ?? ''}`)].join('\n');
fs.mkdirSync('pop-reports', { recursive: true });
fs.writeFileSync(`pop-reports/summary-${stamp}.csv`, csv + '\n');
console.log(`\nDone. Lowest scores first:\n${csv}\n\nSaved pop-reports/summary-${stamp}.csv`);
