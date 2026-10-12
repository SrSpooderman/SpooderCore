export interface Project {
  slug: string;
  name: string;
  stack: string[];
  featured: boolean;
  number: string;
  logo?: string;
  repository?: string;
  releaseRepository?: string;
  team?: { name: string; roleKey: string }[];
}

export const projects: Project[] = [
  {
    slug: 'spiderfinance',
    name: 'SpiderFinance',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker'],
    featured: true,
    number: '01',
    logo: '/brand/spiderfinance.png',
    repository: 'https://github.com/SrSpooderman/SpiderFinance',
    releaseRepository: 'SrSpooderman/SpiderFinance',
  },
  {
    slug: 'cliponomicon-api',
    name: 'Cliponomicon API',
    stack: ['FastAPI', 'MySQL', 'Redis', 'RQ', 'FFmpeg', 'React', 'TypeScript', 'Docker'],
    featured: true,
    number: '02',
    logo: '/brand/cliponomicon.png',
    repository: 'https://github.com/SrSpooderman/CliponomiconAPI',
    team: [
      { name: 'Francisco Valencia (SrSpooderman)', roleKey: 'backendRole' },
      { name: 'Lluis Xavier Obrador Artigues', roleKey: 'devopsRole' },
      { name: 'Joan Vicens Muntaner', roleKey: 'frontendRole' },
    ],
  },
  {
    slug: 'spiderportfolio',
    name: 'SpiderPortfolio',
    stack: ['React', 'Puck', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: false,
    number: '03',
    repository: 'https://github.com/SrSpooderman/Portfolio/tree/develop',
  },
  {
    slug: 'spidertomp3',
    name: 'SpiderToMP3',
    stack: ['Python', 'PySide6', 'yt-dlp', 'FFmpeg'],
    featured: false,
    number: '04',
    repository: 'https://github.com/SrSpooderman/SpiderToMP3',
    releaseRepository: 'SrSpooderman/SpiderToMP3',
  },
  {
    slug: 'spiderawake',
    name: 'SpiderAwake',
    stack: ['Python', 'Kivy', 'Java'],
    featured: false,
    number: '05',
    repository: 'https://github.com/SrSpooderman/SpiderAwake',
  },
  {
    slug: 'rehuse',
    name: 'ReHuse',
    stack: ['Python', 'FastAPI', 'MySQL'],
    featured: false,
    number: '06',
    repository: 'https://github.com/SrSpooderman/ReHuse',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
