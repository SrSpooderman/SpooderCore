import type { Project } from './projects';
import { ELEMENT_NODE, parse, renderSync, walkSync } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  html_url: string;
  assets: GitHubAsset[];
}

export interface ReleaseAsset {
  name: string;
  size: number;
  url: string;
}

export interface ProjectRelease {
  tag: string;
  name: string;
  publishedAt: string;
  prerelease: boolean;
  url: string;
  assets: ReleaseAsset[];
}

export interface ProjectReleaseList {
  projectName: string;
  repository: string;
  repositoryUrl: string;
  releases: ProjectRelease[];
  unavailable: boolean;
}

export interface ProjectPageContent {
  readmeHtml: string | null;
  releases: ProjectRelease[];
}

interface GitHubRepository {
  default_branch: string;
}

interface ProjectRepository {
  path: string;
  ref?: string;
}

function githubUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getProjectReleases(projects: Project[]): Promise<ProjectReleaseList[]> {
  const listedProjects = projects.filter((project) => project.releaseRepository);

  return Promise.all(
    listedProjects.map(async (project) => {
      const repository = project.releaseRepository!;
      const repositoryUrl = `https://github.com/${repository}`;

      try {
        const response = await fetch(
          `https://api.github.com/repos/${repository}/releases?per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              'User-Agent': 'SpooderCore-portal',
              'X-GitHub-Api-Version': '2022-11-28',
            },
            signal: AbortSignal.timeout(8000),
          },
        );

        if (!response.ok) {
          const releases = await getReleasesFromPage(repository);
          return {
            projectName: project.name,
            repository,
            repositoryUrl,
            releases,
            unavailable: false,
          };
        }

        const data = (await response.json()) as GitHubRelease[];
        const releases = data
          .filter((release) => !release.draft && release.published_at)
          .map((release) => {
            const url = githubUrl(release.html_url);
            if (!url) return null;

            return {
              tag: release.tag_name,
              name: release.name || release.tag_name,
              publishedAt: release.published_at!,
              prerelease: release.prerelease,
              url,
              assets: release.assets.flatMap((asset) => {
                const assetUrl = githubUrl(asset.browser_download_url);
                return assetUrl ? [{ name: asset.name, size: asset.size, url: assetUrl }] : [];
              }),
            } satisfies ProjectRelease;
          })
          .filter((release): release is ProjectRelease => release !== null)
          .sort((a, b) => {
            if (a.prerelease !== b.prerelease) return a.prerelease ? 1 : -1;
            return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
          });

        return {
          projectName: project.name,
          repository,
          repositoryUrl,
          releases,
          unavailable: false,
        };
      } catch {
        return {
          projectName: project.name,
          repository,
          repositoryUrl,
          releases: [],
          unavailable: true,
        };
      }
    }),
  );
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function parseAssetSize(value: string): number {
  const match = value.match(/([\d,.]+)\s*(Bytes?|KB|MB|GB)/i);
  if (!match) return 0;
  const amount = Number(match[1].replace(/,/g, ''));
  const unit = match[2].toLowerCase();
  const multiplier = unit.startsWith('gb')
    ? 1_000_000_000
    : unit.startsWith('mb')
      ? 1_000_000
      : unit.startsWith('kb')
        ? 1_000
        : 1;
  return Math.round(amount * multiplier);
}

async function getReleasesFromPage(repository: string): Promise<ProjectRelease[]> {
  const headers = { 'User-Agent': 'SpooderCore-portal' };
  const releases: ProjectRelease[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(`https://github.com/${repository}/releases?page=${page}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('GitHub releases page request failed');
    const html = await response.text();
    const sections = [...html.matchAll(/<section\s+id="release-([^"]+)"[\s\S]*?<\/section>/g)];
    if (sections.length === 0) break;

    const parsed = await Promise.all(
      sections.map(async ([section, slug]) => {
        const tag = decodeHtml(slug.replace(/^release-/, ''));
        const date = section.match(/<relative-time[^>]*datetime="([^"]+)"/)?.[1];
        const fragment = section.match(
          /<include-fragment[^>]*src="([^"]*\/releases\/expanded_assets\/[^"]+)"/,
        )?.[1];
        if (!date || !fragment) return null;

        const assetResponse = await fetch(fragment, {
          headers,
          signal: AbortSignal.timeout(10000),
        });
        if (!assetResponse.ok) return null;
        const assetHtml = await assetResponse.text();
        const assets: ReleaseAsset[] = [];
        for (const [, href, name, size] of assetHtml.matchAll(
          /<a[^>]*href="([^"]+\/releases\/download\/[^" ]+)"[^>]*>[\s\S]*?<span[^>]*class="text-bold"[^>]*>([\s\S]*?)<\/span>[\s\S]*?<\/a>[\s\S]*?<span[^>]*>([\d,.]+\s*(?:Bytes?|KB|MB|GB))<\/span>/g,
        )) {
          const url = githubUrl(new URL(decodeHtml(href), 'https://github.com').toString());
          if (url)
            assets.push({
              name: decodeHtml(name.replace(/<[^>]+>/g, '').trim()),
              size: parseAssetSize(size),
              url,
            });
        }

        const tagUrl = `https://github.com/${repository}/releases/tag/${encodeURIComponent(tag)}`;
        return {
          tag,
          name: tag,
          publishedAt: date,
          prerelease: /Pre-release/i.test(section),
          url: tagUrl,
          assets,
        } satisfies ProjectRelease;
      }),
    );
    releases.push(
      ...parsed.filter(
        (release): release is ProjectRelease => !!release && release.assets.length > 0,
      ),
    );

    if (!html.includes('rel="next"')) break;
  }

  return releases;
}

function projectRepository(repositoryUrl: string | undefined): ProjectRepository | null {
  if (!repositoryUrl) return null;
  try {
    const url = new URL(repositoryUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'github.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const [owner, repository] = parts;
    if (!owner || !repository) return null;
    const treeIndex = parts.indexOf('tree', 2);
    const ref =
      treeIndex >= 0
        ? parts
            .slice(treeIndex + 1)
            .map((part) => decodeURIComponent(part))
            .join('/')
        : undefined;
    return {
      path: `${owner}/${repository}`,
      ref: ref || undefined,
    };
  } catch {
    return null;
  }
}

export async function getProjectPageContent(project: Project): Promise<ProjectPageContent> {
  const repository = projectRepository(project.repository);
  if (!repository) return { readmeHtml: null, releases: [] };
  const readmeEndpoint = new URL(`https://api.github.com/repos/${repository.path}/readme`);
  if (repository.ref) readmeEndpoint.searchParams.set('ref', repository.ref);

  const [repositoryResponse, readmeResponse, releaseResult] = await Promise.all([
    fetch(`https://api.github.com/repos/${repository.path}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'SpooderCore-portal',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(10000),
    }).catch(() => null),
    fetch(readmeEndpoint, {
      headers: {
        Accept: 'application/vnd.github.html+json',
        'User-Agent': 'SpooderCore-portal',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: AbortSignal.timeout(10000),
    }).catch(() => null),
    getProjectReleases([{ ...project, releaseRepository: repository.path }]),
  ]);

  let readmeHtml: string | null = null;
  if (readmeResponse?.ok && repositoryResponse?.ok) {
    try {
      const rawHtml = await readmeResponse.text();
      const repositoryInfo = (await repositoryResponse.json()) as GitHubRepository;
      const branch = repository.ref ?? repositoryInfo.default_branch;
      if (rawHtml.length <= 1_500_000 && branch) {
        readmeHtml = await sanitizeReadme(rawHtml, repository.path, branch);
      }
    } catch {
      readmeHtml = null;
    }
  }

  return {
    readmeHtml,
    releases: (releaseResult[0]?.releases ?? []).filter((release) => release.assets.length > 0),
  };
}

async function sanitizeReadme(
  html: string,
  repository: string,
  branch: string,
): Promise<string | null> {
  if (!html.trim()) return null;
  const document = parse(html);
  sanitize({
    allowElements: [
      'a',
      'article',
      'blockquote',
      'br',
      'code',
      'del',
      'details',
      'div',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hr',
      'img',
      'li',
      'ol',
      'p',
      'pre',
      's',
      'small',
      'span',
      'strong',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'th',
      'thead',
      'tr',
      'ul',
    ],
    allowAttributes: {
      alt: ['img'],
      colspan: ['td', 'th'],
      height: ['img'],
      href: ['a'],
      id: ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      rowspan: ['td', 'th'],
      src: ['img'],
      title: ['a', 'img'],
      width: ['img'],
    },
  })(document);

  walkSync(document, (node) => {
    if (node.type !== ELEMENT_NODE) return;
    for (const attribute of ['href', 'src'] as const) {
      const value = node.attributes[attribute];
      if (!value) continue;
      if (attribute === 'href' && value.startsWith('#')) continue;

      const base =
        attribute === 'src'
          ? `https://raw.githubusercontent.com/${repository}/${branch}/`
          : `https://github.com/${repository}/blob/${branch}/`;
      try {
        const url = new URL(value, base);
        if (url.protocol !== 'https:') delete node.attributes[attribute];
        else node.attributes[attribute] = url.toString();
      } catch {
        delete node.attributes[attribute];
      }
    }
  });

  return renderSync(document);
}
