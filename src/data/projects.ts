export interface Project {
  slug: string;
  name: string;
  stack: string[];
  featured: boolean;
  number: string;
  logo?: string;
  repository?: string;
  demoUrl?: string;
  releaseRepository?: string;
  statusKey?: string;
  featureKeys?: string[];
  technologyGroups?: { labelKey: string; technologies: string[] }[];
  contributionKey?: string;
  quoteKey?: string;
  scopeNoteKey?: string;
  interestingKey?: string;
  interestingTitleKey?: string;
  contributionSources?: string[];
  documentation?: { labelKey: string; url: string }[];
  screenshots?: { src: string; altKey: string }[];
  team?: { name: string; roleKey: string; links?: { label: string; url: string }[] }[];
}

export const projects: Project[] = [
  {
    slug: 'spiderfinance',
    name: 'SpiderFinance',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: true,
    number: '02',
    technologyGroups: [
      { labelKey: 'techFrontend', technologies: ['React', 'TypeScript', 'Vite'] },
      { labelKey: 'techBackend', technologies: ['Python', 'FastAPI', 'SQLAlchemy'] },
      { labelKey: 'techData', technologies: ['PostgreSQL', 'SQLite'] },
      { labelKey: 'techDeployment', technologies: ['Docker', 'Nginx'] },
    ],
    statusKey: 'spiderfinanceStatus',
    featureKeys: [
      'spiderfinanceFeaturePlanning',
      'spiderfinanceFeatureForecasts',
      'spiderfinanceFeatureAccounts',
    ],
    contributionSources: [
      'https://github.com/SrSpooderman/SpiderFinance/commit/d076d337f2d2e4aed8e41b3b25516fd7324decb4',
      'https://github.com/SrSpooderman/SpiderFinance/commit/c58842d9854f89be8158cd8e4f0a1f31f9621a9c',
      'https://github.com/SrSpooderman/SpiderFinance/commit/104dd163de57566a6f700d0105810019de059da0',
    ],
    documentation: [
      {
        labelKey: 'spiderfinanceReadme',
        url: 'https://github.com/SrSpooderman/SpiderFinance/blob/main/README.md',
      },
      {
        labelKey: 'spiderfinanceArchitecture',
        url: 'https://github.com/SrSpooderman/SpiderFinance/blob/main/ARCHITECTURE.md',
      },
      {
        labelKey: 'spiderfinanceDeployment',
        url: 'https://github.com/SrSpooderman/SpiderFinance/blob/main/docs/deployment.md',
      },
      {
        labelKey: 'spiderfinanceAdministration',
        url: 'https://github.com/SrSpooderman/SpiderFinance/blob/main/docs/administration.md',
      },
    ],
    screenshots: [
      {
        src: 'https://raw.githubusercontent.com/SrSpooderman/SpiderFinance/main/docs/screenshots/resumen.png',
        altKey: 'spiderfinanceOverviewScreenshot',
      },
    ],
    logo: '/brand/spiderfinance.png',
    repository: 'https://github.com/SrSpooderman/SpiderFinance',
    demoUrl: 'https://spoodercore.com/demo/spiderfinance/',
    releaseRepository: 'SrSpooderman/SpiderFinance',
  },
  {
    slug: 'cliponomicon-api',
    name: 'Cliponomicon API',
    stack: ['React', 'FastAPI', 'MySQL', 'Redis', 'FFmpeg'],
    featured: true,
    number: '01',
    technologyGroups: [
      { labelKey: 'techFrontend', technologies: ['React', 'TypeScript', 'Vite'] },
      { labelKey: 'techBackend', technologies: ['Python', 'FastAPI', 'SQLAlchemy'] },
      { labelKey: 'techDataAndJobs', technologies: ['MySQL', 'Redis', 'RQ'] },
      {
        labelKey: 'techProcessingAndDeployment',
        technologies: ['FFmpeg', 'Docker', 'Nginx'],
      },
    ],
    statusKey: 'cliponomiconApiStatus',
    featureKeys: [
      'cliponomiconApiFeatureUpload',
      'cliponomiconApiFeatureProcessing',
      'cliponomiconApiFeaturePlayback',
      'cliponomiconApiFeatureBackoffice',
    ],
    contributionSources: [
      'https://github.com/SrSpooderman/CliponomiconAPI/commit/8f9da2286ccb28a9655c22c121351b5f90d0492c',
      'https://github.com/SrSpooderman/CliponomiconAPI/commit/161dc1472b6d538eb7cdd7e7aed30806aacf3a84',
      'https://github.com/SrSpooderman/CliponomiconAPI/commit/20faf8e77dfd753f21d456e66d3d4474223d83b0',
    ],
    documentation: [
      {
        labelKey: 'cliponomiconApiReadme',
        url: 'https://github.com/SrSpooderman/CliponomiconAPI/blob/main/README.md',
      },
      {
        labelKey: 'cliponomiconApiChangelog',
        url: 'https://github.com/SrSpooderman/CliponomiconAPI/blob/main/CHANGELOG.md',
      },
      {
        labelKey: 'cliponomiconApiBackofficeReadme',
        url: 'https://github.com/SrSpooderman/CliponomiconAPI/blob/main/backoffice/README.md',
      },
    ],
    logo: '/brand/cliponomicon.png',
    repository: 'https://github.com/SrSpooderman/CliponomiconAPI',
    team: [
      {
        name: 'Francisco Valencia (SrSpooderman)',
        roleKey: 'backendRole',
        links: [{ label: 'GitHub', url: 'https://github.com/SrSpooderman' }],
      },
      { name: 'Lluis Xavier Obrador Artigues', roleKey: 'devopsRole' },
      { name: 'Joan Vicens Muntaner', roleKey: 'frontendRole' },
    ],
  },
  {
    slug: 'spiderportfolio',
    name: 'SpiderPortfolio',
    stack: ['React', 'Puck', 'FastAPI', 'PostgreSQL'],
    featured: false,
    number: '05',
    statusKey: 'spiderportfolioStatus',
    featureKeys: [
      'spiderportfolioFeatureContent',
      'spiderportfolioFeaturePreview',
      'spiderportfolioFeaturePublishing',
    ],
    technologyGroups: [
      { labelKey: 'techVisualEditor', technologies: ['React', 'Puck'] },
      { labelKey: 'techBackendAndData', technologies: ['FastAPI', 'PostgreSQL'] },
    ],
    repository: 'https://github.com/SrSpooderman/Portfolio/tree/develop',
  },
  {
    slug: 'spidertomp3',
    name: 'SpiderToMP3',
    stack: ['Python', 'PySide6', 'yt-dlp', 'FFmpeg'],
    featured: true,
    number: '03',
    technologyGroups: [
      { labelKey: 'techDesktop', technologies: ['Python', 'PySide6', 'Qt Widgets'] },
      { labelKey: 'techMedia', technologies: ['yt-dlp', 'FFmpeg', 'Mutagen'] },
    ],
    statusKey: 'spidertomp3Status',
    interestingKey: 'spidertomp3Interesting',
    featureKeys: ['spidertomp3FeaturePlaylists', 'spidertomp3FeatureFormats'],
    scopeNoteKey: 'spidertomp3ScopeNote',
    contributionSources: [
      'https://github.com/SrSpooderman/SpiderToMP3/commit/df1c1c28cea43105743fd78372733045ed5ae35a',
      'https://github.com/SrSpooderman/SpiderToMP3/commit/db9738ee52bdd020cfe4f1b824675debfdf4814e',
    ],
    documentation: [
      {
        labelKey: 'spidertomp3Readme',
        url: 'https://github.com/SrSpooderman/SpiderToMP3/blob/main/README.md',
      },
      {
        labelKey: 'spidertomp3Builds',
        url: 'https://github.com/SrSpooderman/SpiderToMP3/blob/main/docs/builds.md',
      },
      {
        labelKey: 'spidertomp3Privacy',
        url: 'https://github.com/SrSpooderman/SpiderToMP3/blob/main/PRIVACY.md',
      },
      {
        labelKey: 'spidertomp3Changelog',
        url: 'https://github.com/SrSpooderman/SpiderToMP3/blob/main/CHANGELOG.md',
      },
      {
        labelKey: 'spidertomp3Releases',
        url: 'https://github.com/SrSpooderman/SpiderToMP3/releases',
      },
    ],
    logo: 'https://raw.githubusercontent.com/SrSpooderman/SpiderToMP3/main/assets/spidertomp3-icon.svg',
    repository: 'https://github.com/SrSpooderman/SpiderToMP3',
    releaseRepository: 'SrSpooderman/SpiderToMP3',
  },
  {
    slug: 'spiderawake',
    name: 'SpiderAwake',
    stack: ['Python', 'Kivy', 'Java'],
    featured: false,
    number: '06',
    statusKey: 'spiderawakeStatus',
    featureKeys: ['spiderawakeFeatureAlarm', 'spiderawakeFeatureChallenges'],
    interestingKey: 'spiderawakeInteresting',
    technologyGroups: [{ labelKey: 'techAndroid', technologies: ['Python', 'Kivy', 'Java'] }],
    repository: 'https://github.com/SrSpooderman/SpiderAwake',
  },
  {
    slug: 'rehuse',
    name: 'ReHuse',
    stack: ['Python', 'FastAPI', 'MySQL'],
    featured: true,
    number: '04',
    featureKeys: ['rehuseFeatureTemplates', 'rehuseFeaturePersonalize', 'rehuseFeaturePdf'],
    interestingKey: 'rehuseInteresting',
    technologyGroups: [
      { labelKey: 'techBackendAndData', technologies: ['Python', 'FastAPI', 'MySQL'] },
    ],
    repository: 'https://github.com/SrSpooderman/ReHuse',
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
