import { projects } from './projects';
import { getProjectPageContent } from './releases';
import { getLocalizedPaths } from '../i18n/locales';

export async function getProjectStaticPaths() {
  const routes = await Promise.all(
    projects.map(async (project) => ({ project, page: await getProjectPageContent(project) })),
  );
  return routes.flatMap(({ project, page }) =>
    getLocalizedPaths().map(({ params, props }) => ({
      params: { ...params, slug: project.slug },
      props: { ...props, slug: project.slug, ...page },
    })),
  );
}
