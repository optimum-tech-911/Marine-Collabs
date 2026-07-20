import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const host = '127.0.0.1';
const port = 4399;
const origin = `http://${host}:${port}`;
const creatorSource = await readFile(path.join(process.cwd(), 'src/data/creators.ts'), 'utf8');
const creatorSlugs = [...creatorSource.matchAll(/(?:^|\n)    slug: '([^']+)'/g)].map((match) => match[1]);
const routes = [
  '/', '/creators', ...creatorSlugs.map((slug) => `/creators/${slug}`),
  '/solutions', '/for-brands', '/campaign-builder', '/selection', '/methodology',
  '/case-studies', '/about', '/join-the-network', '/contact', '/privacy', '/terms', '/legal', '/404.html',
  '/fr/', '/en/', '/fr/createurs/', '/en/creators/',
  ...creatorSlugs.flatMap((slug) => [`/fr/createurs/${slug}/`, `/en/creators/${slug}/`]),
  '/fr/solutions/', '/en/solutions/', '/fr/pour-les-marques/', '/en/for-brands/',
  '/fr/creer-une-campagne/', '/en/build-a-campaign/', '/fr/a-propos/', '/en/about/',
  '/fr/contact/', '/en/contact/', '/fr/methodologie/', '/en/methodology/',
];

const child = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', host, '--port', String(port), '--strictPort'], {
  cwd: process.cwd(),
  stdio: ['ignore', 'pipe', 'pipe'],
});

let stderr = '';
child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

async function waitForServer() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin, { redirect: 'manual' });
      if (response.status > 0) return;
    } catch { /* Server not ready. */ }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Le serveur preview ne répond pas. ${stderr}`);
}

const errors = [];
try {
  await waitForServer();
  for (const route of routes) {
    const response = await fetch(`${origin}${route}`, { redirect: 'manual' });
    const html = await response.text();
    if (response.status !== 200) errors.push(`${route}: HTTP ${response.status}`);
    if (!html.includes('data-static-shell')) errors.push(`${route}: shell statique absent`);
    if (!html.includes('/assets/index-')) errors.push(`${route}: bundle de production absent`);
    if (!html.includes('<title>')) errors.push(`${route}: title absent`);
    if (!html.includes('<link rel="canonical"')) errors.push(`${route}: canonical absent`);
  }
} finally {
  child.kill('SIGTERM');
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 1200);
    child.once('exit', () => { clearTimeout(timer); resolve(); });
  });
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Route response verification passed for ${routes.length} routes.`);
