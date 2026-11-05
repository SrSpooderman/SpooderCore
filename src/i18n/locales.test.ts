import { describe, expect, it } from 'vitest';
import {
  defaultLocale,
  getLocalizedPaths,
  locales,
  localizedPath,
  messages,
  type Locale,
  type MessageGroup,
} from './locales';

const messageGroups: MessageGroup[] = ['common', 'home', 'demos', 'projects', 'downloads', 'lab'];

describe('localizedPath', () => {
  it.each([
    ['es', '/', '/'],
    ['en', '/', '/en'],
    ['es', '/projects/spiderfinance', '/projects/spiderfinance'],
    ['en', '/projects/spiderfinance', '/en/projects/spiderfinance'],
    ['en', 'projects', '/en/projects'],
  ] as [Locale, string, string][])('maps %s + %s to %s', (locale, path, expected) => {
    expect(localizedPath(locale, path)).toBe(expected);
  });
});

describe('locale catalogs', () => {
  it('creates static paths for every non-default locale', () => {
    expect(getLocalizedPaths()).toEqual(
      locales
        .filter((locale) => locale !== defaultLocale)
        .map((locale) => ({ params: { locale }, props: { locale } })),
    );
  });

  it.each(locales)('loads non-empty string catalogs for %s', (locale) => {
    for (const group of messageGroups) {
      const catalog = messages(locale, group);
      expect(Object.keys(catalog).length).toBeGreaterThan(0);
      expect(Object.values(catalog).every((value) => typeof value === 'string')).toBe(true);
    }
  });
});
