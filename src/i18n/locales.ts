import config from './config.json';

export const defaultLocale = config.defaultLocale;
export const locales = config.locales;
export const localeNames = config.localeNames;
export type Locale = (typeof locales)[number];
export type MessageGroup = 'common' | 'home' | 'about' | 'demos' | 'projects' | 'downloads' | 'lab';

type Catalog = Record<string, string>;
const catalogFiles = import.meta.glob('./messages/*/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Catalog>;

const catalogs: Record<string, Record<string, Catalog>> = {};
for (const [file, catalog] of Object.entries(catalogFiles)) {
  const [, locale, group] = file.match(/\.\/messages\/([^/]+)\/([^/]+)\.json$/) ?? [];
  if (locale && group) (catalogs[locale] ??= {})[group] = catalog;
}

export function messages(locale: Locale, group: MessageGroup): Catalog {
  const catalog = catalogs[locale]?.[group];
  if (!catalog) throw new Error(`Missing translation catalog: ${locale}/${group}`);
  return catalog;
}

export function getLocalizedPaths() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ params: { locale }, props: { locale } }));
}

export function localizedPath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? cleanPath : `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
