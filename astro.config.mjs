import { defineConfig } from 'astro/config';
import localeConfig from './src/i18n/config.json' with { type: 'json' };

export default defineConfig({
  site: 'https://www.spoodercore.com',
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    locales: localeConfig.locales,
    defaultLocale: localeConfig.defaultLocale,
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    '/es': '/',
    '/about': '/',
    '/es/about': '/',
    '/es/projects': '/projects',
    '/es/downloads': '/downloads',
    '/es/demos': '/demos',
    '/es/lab': '/lab',
    ...Object.fromEntries(
      [
        'spiderfinance',
        'cliponomicon-api',
        'spiderportfolio',
        'spidertomp3',
        'spiderawake',
        'rehuse',
      ].map((slug) => [`/es/projects/${slug}`, `/projects/${slug}`]),
    ),
  },
});
