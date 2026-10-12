import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.spoodercore.com',
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    '/es': '/',
    '/es/about': '/about',
    '/es/projects': '/projects',
    '/es/downloads': '/downloads',
    '/es/demos': '/demos',
    '/es/lab': '/lab',
    ...Object.fromEntries(
      ['spiderfinance', 'cliponomicon-api', 'spiderportfolio', 'spidertomp3', 'spiderawake', 'rehuse']
        .map((slug) => [`/es/projects/${slug}`, `/projects/${slug}`]),
    ),
  },
});
