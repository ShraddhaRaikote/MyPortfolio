/**
 * Seed Sanity with placeholder portfolio content.
 *
 * Usage (from studio/):
 *   1. Create a write token at https://sanity.io/manage → API → Tokens
 *   2. Set SANITY_API_TOKEN in studio/.env (or export in shell)
 *   3. npm run seed
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');

function loadEnvFile() {
  try {
    const contents = readFileSync(envPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key && !(key in process.env)) {
        process.env[key] = rest.join('=');
      }
    }
  } catch {
    // .env is optional if vars are exported in the shell
  }
}

loadEnvFile();

/** Windows + antivirus HTTPS scanning often breaks Node TLS; use OS cert store. */
async function configureTls() {
  if (process.platform !== 'win32') return;
  process.env.NODE_USE_SYSTEM_CA ??= '1';
  try {
    const winCa = await import('win-ca');
    const inject = winCa.default?.inject ?? winCa.inject;
    if (typeof inject === 'function') inject('+');
  } catch {
    // win-ca optional; NODE_USE_SYSTEM_CA still helps on Node 21+
  }
}

await configureTls();

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'cq64slan';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN?.trim();

const PLACEHOLDER = /your_write_token|paste.*token|example/i;

if (!token) {
  console.error('Missing SANITY_API_TOKEN in studio/.env');
  console.error('Create one: sanity.io/manage → cq64slan → API → Tokens → Editor');
  process.exit(1);
}

if (PLACEHOLDER.test(token) || token.length < 40) {
  console.error('SANITY_API_TOKEN still looks like the README placeholder.');
  console.error('Copy the real token from Sanity Manage (starts with sk…) into studio/.env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  metaTitle: 'Shraddha Raikote | Full Stack Developer',
  metaDescription:
    'Portfolio showcasing full stack projects, skills, and experience in Angular, TypeScript, and modern web development.',
  contactEmail: 'shraddharaikote123@gmail.com',
  githubUrl: 'https://github.com/ShraddhaRaikote',
  linkedinUrl: 'https://linkedin.com/in/shraddha-raikote',
  homeWelcomeText: 'Welcome',
  homeStoryEyebrow: 'My Story',
  homeStoryTitle: 'Who I am',
  projectsPageTitle: 'My Projects',
  contactPageTitle: "Let's connect",
};

const profile = {
  _id: 'profile',
  _type: 'profile',
  name: 'Shraddha Raikote',
  title: 'Full Stack Developer',
  tagline: 'Building elegant, performant web experiences',
  shortBio:
    'I craft modern web applications with Angular and TypeScript, focusing on clean architecture, accessibility, and polished user interfaces.',
  fullBio:
    'I am a full stack developer passionate about building products that feel fast, intuitive, and thoughtfully designed. My work spans enterprise Angular applications, RESTful APIs, and cloud-ready deployments.\n\nI enjoy solving complex UI problems, improving developer experience, and turning ideas into reliable software. When I am not coding, I explore new frameworks and contribute to side projects that push my skills further.',
  location: 'Remote',
  yearsExp: 5,
  openToWork: true,
};

const projects = [
  {
    _id: 'project-devflow-analytics',
    _type: 'project',
    title: 'DevFlow Analytics',
    slug: { _type: 'slug', current: 'devflow-analytics' },
    summary: 'Real-time developer productivity dashboard with live metrics and team insights.',
    body: 'DevFlow Analytics is a full stack dashboard that aggregates Git activity, CI metrics, and code review stats into a single glassmorphic interface. Built with Angular signals for reactive state, it uses WebSockets for live updates and Chart.js for visualizations.\n\nKey features include customizable widgets, role-based access, export to PDF, and dark-mode-first design aligned with developer workflows.',
    tech: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    _id: 'project-taskforge-cli',
    _type: 'project',
    title: 'TaskForge CLI',
    slug: { _type: 'slug', current: 'taskforge-cli' },
    summary: 'Command-line task manager with project templates and Git integration.',
    body: 'TaskForge CLI helps developers scaffold projects, track todos, and sync with Git branches from the terminal. It supports plugin architecture, custom themes, and cross-platform installs via npm.\n\nThe tool reduced setup time for new repos by 60% in internal testing and includes autocomplete for bash and PowerShell.',
    tech: ['Node.js', 'TypeScript', 'Commander', 'Inquirer'],
    githubUrl: 'https://github.com',
    featured: true,
    order: 2,
  },
  {
    _id: 'project-glassui-components',
    _type: 'project',
    title: 'GlassUI Component Library',
    slug: { _type: 'slug', current: 'glassui-components' },
    summary: 'Reusable Angular component library with glassmorphism design tokens.',
    body: 'GlassUI is a lightweight Angular component library featuring cards, modals, navigation, and form controls styled with glassmorphism. Published as an npm package with Storybook documentation and full accessibility testing.',
    tech: ['Angular', 'Tailwind CSS', 'Storybook', 'Vitest'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 3,
  },
  {
    _id: 'project-cloudsync-api',
    _type: 'project',
    title: 'CloudSync API Gateway',
    slug: { _type: 'slug', current: 'cloudsync-api' },
    summary: 'Microservices API gateway with rate limiting and JWT authentication.',
    body: 'CloudSync provides a unified entry point for multiple backend services with OAuth2, rate limiting, request logging, and OpenAPI documentation. Deployed on AWS with Docker and monitored via CloudWatch.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS'],
    githubUrl: 'https://github.com',
    featured: false,
    order: 4,
  },
];

const skills = [
  { _id: 'skill-angular', _type: 'skill', name: 'Angular', category: 'frontend' },
  { _id: 'skill-typescript', _type: 'skill', name: 'TypeScript', category: 'frontend' },
  { _id: 'skill-tailwind', _type: 'skill', name: 'Tailwind CSS', category: 'frontend' },
  { _id: 'skill-rxjs', _type: 'skill', name: 'RxJS', category: 'frontend' },
  { _id: 'skill-html-css', _type: 'skill', name: 'HTML/CSS', category: 'frontend' },
  { _id: 'skill-node', _type: 'skill', name: 'Node.js', category: 'backend' },
  { _id: 'skill-express', _type: 'skill', name: 'Express', category: 'backend' },
  { _id: 'skill-postgresql', _type: 'skill', name: 'PostgreSQL', category: 'backend' },
  { _id: 'skill-rest', _type: 'skill', name: 'REST APIs', category: 'backend' },
  { _id: 'skill-git', _type: 'skill', name: 'Git', category: 'tools' },
  { _id: 'skill-docker', _type: 'skill', name: 'Docker', category: 'tools' },
  { _id: 'skill-aws', _type: 'skill', name: 'AWS', category: 'tools' },
  { _id: 'skill-figma', _type: 'skill', name: 'Figma', category: 'tools' },
];

const experience = [
  {
    _id: 'experience-tech-solutions',
    _type: 'experience',
    company: 'Tech Solutions Inc.',
    role: 'Senior Frontend Developer',
    startDate: '2022',
    endDate: 'Present',
    description:
      'Led Angular migration for enterprise dashboard serving 10k+ users. Improved Lighthouse performance score from 62 to 94.',
    order: 1,
  },
  {
    _id: 'experience-digital-agency',
    _type: 'experience',
    company: 'Digital Agency Co.',
    role: 'Full Stack Developer',
    startDate: '2020',
    endDate: '2022',
    description:
      'Built client portals and e-commerce platforms using Angular, Node.js, and PostgreSQL. Mentored junior developers.',
    order: 2,
  },
  {
    _id: 'experience-startup-labs',
    _type: 'experience',
    company: 'Startup Labs',
    role: 'Junior Developer',
    startDate: '2019',
    endDate: '2020',
    description:
      'Contributed to MVP launches, wrote unit tests, and integrated third-party APIs for payment and auth flows.',
    order: 3,
  },
];

const interests = [
  {
    _id: 'interest-ui-engineering',
    _type: 'interest',
    title: 'UI Engineering',
    description: 'Crafting fluid interfaces with motion, glass aesthetics, and micro-interactions.',
    icon: 'palette',
    order: 1,
  },
  {
    _id: 'interest-angular-architecture',
    _type: 'interest',
    title: 'Angular Architecture',
    description: 'Building scalable apps with standalone components, signals, and clean patterns.',
    icon: 'architecture',
    order: 2,
  },
  {
    _id: 'interest-developer-tools',
    _type: 'interest',
    title: 'Developer Tools',
    description: 'CLIs, dashboards, and automation that make teams faster.',
    icon: 'terminal',
    order: 3,
  },
  {
    _id: 'interest-cloud-devops',
    _type: 'interest',
    title: 'Cloud & DevOps',
    description: 'Deploying reliable apps with Docker, CI/CD, and cloud platforms.',
    icon: 'cloud',
    order: 4,
  },
];

const documents = [siteSettings, profile, ...projects, ...skills, ...experience, ...interests];

async function seed() {
  console.log(`Seeding ${documents.length} documents into ${projectId}/${dataset}...`);

  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();
  console.log('Seed complete. Add project/profile images in Sanity Studio if needed.');
}

seed().catch((err) => {
  const msg = err.message ?? String(err);
  console.error('Seed failed:', msg);

  if (/issuer certificate|UNABLE_TO_VERIFY|certificate/i.test(msg)) {
    console.error('\n--- SSL fix (Windows) ---');
    console.error('Antivirus HTTPS scanning often causes this. Try in PowerShell:');
    console.error('  $env:NODE_USE_SYSTEM_CA="1"');
    console.error('  npm run seed');
    console.error('Or temporarily disable HTTPS scanning in your antivirus, then retry.');
  }

  if (/401|403|Unauthorized|permission/i.test(msg)) {
    console.error('\n--- Token fix ---');
    console.error('Use a valid Editor token in studio/.env (not the placeholder text).');
  }

  process.exit(1);
});
