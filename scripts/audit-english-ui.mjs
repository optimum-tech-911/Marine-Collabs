import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const dictionarySource = readFileSync(join(root, 'src/i18n/english-copy.ts'), 'utf8');
const keys = new Set([...dictionarySource.matchAll(/'([^'\n]+)'\s*:/g)].map((match) => match[1]));

const frenchPattern = /[ÀÂÇÉÈÊËÎÏÔÙÛÜàâçéèêëîïôùûü]|\b(?:abonnés?|créateurs?|campagne|marque|réseau|profil|vues?|voile|nautisme|données|preuve|sélection|parler|construire|explorer|retour|ajouter|afficher|aucun|notre|votre|dans|avec|sans|pour|une|des|les)\b/i;
const ignored = /^(?:[\w-]+(?:\s+[\w-]+)*|[./?#=&\w:%+-]+)$/;
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith('.tsx')) files.push(file);
  }
}
walk(join(root, 'src/pages'));
walk(join(root, 'src/components'));

const missing = new Map();
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const candidates = [
    ...[...source.matchAll(/>([^<{][^<{]*?)</g)].map((match) => match[1]),
    ...[...source.matchAll(/'([^'\n]{3,})'/g)].map((match) => match[1]),
    ...[...source.matchAll(/"([^"\n]{3,})"/g)].map((match) => match[1]),
  ];
  for (const candidate of candidates) {
    const value = candidate.trim().replace(/\s+/g, ' ');
    if (value.length > 2 && !/[>{}]/.test(value) && frenchPattern.test(value) && !ignored.test(value) && !keys.has(value)) {
      const relative = file.slice(root.length + 1);
      if (!missing.has(value)) missing.set(value, relative);
    }
  }
}

for (const [value, file] of missing) console.log(`${file} :: ${value}`);
console.log(`\n${missing.size} chaînes françaises visibles sans traduction exacte.`);
