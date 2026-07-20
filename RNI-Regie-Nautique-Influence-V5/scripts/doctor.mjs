import { existsSync, readFileSync } from 'node:fs';

const [major] = process.versions.node.split('.').map(Number);
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const problems = [];

if (major !== 22) problems.push(`Node.js 22 est recommandé et validé ; version détectée : ${process.version}.`);
if (!existsSync(new URL('../package-lock.json', import.meta.url))) problems.push('package-lock.json absent : utilisez le lockfile livré.');
if (!existsSync(new URL('../public/_headers', import.meta.url))) problems.push('Configuration Cloudflare _headers absente.');
if (!existsSync(new URL('../public/_redirects', import.meta.url))) problems.push('Configuration Cloudflare _redirects absente.');

console.log(`RNI ${packageJson.version} · Node ${process.version} · npm ${process.env.npm_config_user_agent?.split(' ')[0] ?? 'non détecté'}`);
if (problems.length) {
  problems.forEach((problem) => console.warn(`- ${problem}`));
  process.exitCode = 1;
} else {
  console.log('- Environnement compatible avec la configuration validée.');
  console.log('- Utilisez npm ci, puis npm run validate.');
}
