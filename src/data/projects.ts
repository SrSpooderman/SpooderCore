export type ProjectStatus = 'Destacado' | 'Catálogo';

export interface Project {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  featured: boolean;
  number: string;
  logo?: string;
  repository?: string;
  releaseRepository?: string;
  contribution?: string;
  team?: { name: string; role: string }[];
}

export const projects: Project[] = [
  {
    slug: 'spiderfinance',
    name: 'SpiderFinance',
    eyebrow: 'FINANZAS PERSONALES',
    summary: 'Plataforma web multiusuario para organizar y consultar finanzas personales.',
    description:
      'Aplicación web para organizar y consultar finanzas personales. El proyecto incluye una API REST, persistencia de datos, autenticación y una interfaz web. Se despliega con contenedores.',
    status: 'Destacado',
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
    eyebrow: 'GESTIÓN Y PROCESAMIENTO DE VÍDEO',
    summary:
      'Plataforma para subir, procesar, almacenar y servir vídeos, con una interfaz de administración.',
    description:
      'Backend modular para gestionar la subida, el procesamiento asíncrono, el almacenamiento y la entrega de vídeos. Incluye transcodificación con FFmpeg, generación de miniaturas, autenticación y una interfaz de administración. Es un proyecto colaborativo.',
    status: 'Destacado',
    stack: ['FastAPI', 'MySQL', 'Redis', 'RQ', 'FFmpeg', 'React', 'TypeScript', 'Docker'],
    featured: true,
    number: '02',
    logo: '/brand/cliponomicon.png',
    repository: 'https://github.com/SrSpooderman/CliponomiconAPI',
    contribution: 'Desarrollo del backend',
    team: [
      { name: 'Francisco Valencia (SrSpooderman)', role: 'Backend' },
      { name: 'Lluis Xavier Obrador Artigues', role: 'DevOps y administración de sistemas' },
      { name: 'Joan Vicens Muntaner', role: 'Frontend' },
    ],
  },
  {
    slug: 'spiderportfolio',
    name: 'SpiderPortfolio',
    eyebrow: 'EDITOR VISUAL DE PORTFOLIOS',
    summary:
      'Aplicación de portfolio con editor visual, componentes reutilizables y contenido publicable.',
    description:
      'Aplicación de portfolio con editor visual de páginas, componentes reutilizables y flujos separados para borradores, vista previa y publicación.',
    status: 'Catálogo',
    stack: ['React', 'Puck', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: false,
    number: '03',
    repository: 'https://github.com/SrSpooderman/Portfolio/tree/develop',
  },
  {
    slug: 'spidertomp3',
    name: 'SpiderToMP3',
    eyebrow: 'APLICACIÓN DE ESCRITORIO',
    summary: 'Aplicación de escritorio para descargar y convertir contenido multimedia.',
    description:
      'Aplicación de escritorio multiplataforma para descargar y convertir fuentes multimedia compatibles. Incluye gestión de cola, metadatos y empaquetado para Linux y Windows.',
    status: 'Catálogo',
    stack: ['Python', 'PySide6', 'yt-dlp', 'FFmpeg'],
    featured: false,
    number: '04',
    repository: 'https://github.com/SrSpooderman/SpiderToMP3',
    releaseRepository: 'SrSpooderman/SpiderToMP3',
  },
  {
    slug: 'spiderawake',
    name: 'SpiderAwake',
    eyebrow: 'CATÁLOGO SECUNDARIO',
    summary: 'Aplicación Android de alarma con retos interactivos.',
    description:
      'Aplicación de alarma para Android desarrollada con Python, Kivy e integración con Java. Incluye retos y minijuegos; las pruebas de fiabilidad en Android siguen en curso.',
    status: 'Catálogo',
    stack: ['Python', 'Kivy', 'Java'],
    featured: false,
    number: '05',
    repository: 'https://github.com/SrSpooderman/SpiderAwake',
  },
  {
    slug: 'rehuse',
    name: 'ReHuse',
    eyebrow: 'CATÁLOGO SECUNDARIO',
    summary: 'Backend para gestionar pacientes, ejercicios y rutinas de rehabilitación.',
    description:
      'Backend orientado a fisioterapia para gestionar pacientes, ejercicios, rutinas de rehabilitación y generación de documentos PDF.',
    status: 'Catálogo',
    stack: ['Python', 'FastAPI', 'MySQL'],
    featured: false,
    number: '06',
    repository: 'https://github.com/SrSpooderman/ReHuse',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
