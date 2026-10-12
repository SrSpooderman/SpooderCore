import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../src/i18n/messages/', import.meta.url);
const config = JSON.parse(
  await readFile(new URL('../src/i18n/config.json', import.meta.url), 'utf8'),
);
const locales = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (locales.length < 2) throw new Error('At least two locale catalogs are required');
const configured = [...config.locales].sort();
if (JSON.stringify(locales) !== JSON.stringify(configured)) {
  throw new Error('Locale folders and src/i18n/config.json locales must match');
}
const groups = (await readdir(new URL(`${locales[0]}/`, root)))
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.slice(0, -5))
  .sort();
let failed = false;

for (const locale of locales.slice(1)) {
  const localeGroups = (await readdir(new URL(`${locale}/`, root)))
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.slice(0, -5))
    .sort();
  const missingGroups = groups.filter((group) => !localeGroups.includes(group));
  const extraGroups = localeGroups.filter((group) => !groups.includes(group));
  if (missingGroups.length || extraGroups.length) {
    failed = true;
    console.error(`${locale}: translation groups differ from ${locales[0]}`);
    if (missingGroups.length) console.error(`  Missing groups: ${missingGroups.join(', ')}`);
    if (extraGroups.length) console.error(`  Extra groups: ${extraGroups.join(', ')}`);
  }
}

for (const group of groups) {
  const catalogs = await Promise.all(
    locales.map(async (locale) => {
      const path = join(root.pathname, locale, `${group}.json`);
      const value = JSON.parse(await readFile(path, 'utf8'));
      if (!value || Array.isArray(value) || typeof value !== 'object') {
        throw new Error(`${path} must contain a flat object of strings`);
      }
      for (const [key, text] of Object.entries(value)) {
        if (typeof text !== 'string') {
          throw new Error(`${path}: "${key}" must be a string`);
        }
      }
      return { locale, path, keys: Object.keys(value).sort() };
    }),
  );

  const [base, ...others] = catalogs;
  for (const catalog of others) {
    const missing = base.keys.filter((key) => !catalog.keys.includes(key));
    const extra = catalog.keys.filter((key) => !base.keys.includes(key));
    if (missing.length || extra.length) {
      failed = true;
      console.error(`${group}: ${catalog.locale} catalog keys differ from ${base.locale}`);
      if (missing.length) console.error(`  Missing: ${missing.join(', ')}`);
      if (extra.length) console.error(`  Extra: ${extra.join(', ')}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`Validated ${groups.length} translation groups for ${locales.join(', ')}.`);
