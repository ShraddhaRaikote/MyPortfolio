import {
  Experience,
  Interest,
  Profile,
  Project,
  SiteSettings,
  Skill,
} from '../models/portfolio.models';

export const MOCK_SITE_SETTINGS: SiteSettings = {
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

export const MOCK_PROFILE: Profile = {
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

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'DevFlow Analytics',
    slug: 'devflow-analytics',
    summary: 'Real-time developer productivity dashboard with live metrics and team insights.',
    body: 'DevFlow Analytics is a full stack dashboard that aggregates Git activity, CI metrics, and code review stats into a single glassmorphic interface. Built with Angular signals for reactive state, it uses WebSockets for live updates and Chart.js for visualizations.\n\nKey features include customizable widgets, role-based access, export to PDF, and dark-mode-first design aligned with developer workflows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tech: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: 'TaskForge CLI',
    slug: 'taskforge-cli',
    summary: 'Command-line task manager with project templates and Git integration.',
    body: 'TaskForge CLI helps developers scaffold projects, track todos, and sync with Git branches from the terminal. It supports plugin architecture, custom themes, and cross-platform installs via npm.\n\nThe tool reduced setup time for new repos by 60% in internal testing and includes autocomplete for bash and PowerShell.',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
    tech: ['Node.js', 'TypeScript', 'Commander', 'Inquirer'],
    githubUrl: 'https://github.com',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    title: 'GlassUI Component Library',
    slug: 'glassui-components',
    summary: 'Reusable Angular component library with glassmorphism design tokens.',
    body: 'GlassUI is a lightweight Angular component library featuring cards, modals, navigation, and form controls styled with glassmorphism. Published as an npm package with Storybook documentation and full accessibility testing.',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    tech: ['Angular', 'Tailwind CSS', 'Storybook', 'Vitest'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 3,
  },
  {
    id: '4',
    title: 'CloudSync API Gateway',
    slug: 'cloudsync-api',
    summary: 'Microservices API gateway with rate limiting and JWT authentication.',
    body: 'CloudSync provides a unified entry point for multiple backend services with OAuth2, rate limiting, request logging, and OpenAPI documentation. Deployed on AWS with Docker and monitored via CloudWatch.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tech: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS'],
    githubUrl: 'https://github.com',
    featured: false,
    order: 4,
  },
];

export const MOCK_SKILLS: Skill[] = [
  { name: 'Angular', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'RxJS', category: 'frontend' },
  { name: 'HTML/CSS', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'Figma', category: 'tools' },
];

export const MOCK_EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    role: 'Senior Frontend Developer',
    startDate: '2022',
    endDate: 'Present',
    description:
      'Led Angular migration for enterprise dashboard serving 10k+ users. Improved Lighthouse performance score from 62 to 94.',
    order: 1,
  },
  {
    id: '2',
    company: 'Digital Agency Co.',
    role: 'Full Stack Developer',
    startDate: '2020',
    endDate: '2022',
    description:
      'Built client portals and e-commerce platforms using Angular, Node.js, and PostgreSQL. Mentored junior developers.',
    order: 2,
  },
  {
    id: '3',
    company: 'Startup Labs',
    role: 'Junior Developer',
    startDate: '2019',
    endDate: '2020',
    description:
      'Contributed to MVP launches, wrote unit tests, and integrated third-party APIs for payment and auth flows.',
    order: 3,
  },
];

export const MOCK_INTERESTS: Interest[] = [
  {
    id: '1',
    title: 'UI Engineering',
    description: 'Crafting fluid interfaces with motion, glass aesthetics, and micro-interactions.',
    icon: 'palette',
  },
  {
    id: '2',
    title: 'Angular Architecture',
    description: 'Building scalable apps with standalone components, signals, and clean patterns.',
    icon: 'architecture',
  },
  {
    id: '3',
    title: 'Developer Tools',
    description: 'CLIs, dashboards, and automation that make teams faster.',
    icon: 'terminal',
  },
  {
    id: '4',
    title: 'Cloud & DevOps',
    description: 'Deploying reliable apps with Docker, CI/CD, and cloud platforms.',
    icon: 'cloud',
  },
];

export const CONTENT_QUESTIONNAIRE = {
  profile: [
    'Your full name',
    'Job title (e.g. Full Stack Developer)',
    'One-line tagline',
    'Short bio (2–3 sentences for homepage)',
    'Full bio (paragraph for About page)',
    'Location',
    'Years of experience',
    'Profile photo URL (optional)',
    'Open to work? (yes/no)',
  ],
  projects: [
    'For each project: title, slug, summary, full description, screenshot URL, tech stack, live demo URL, GitHub URL, featured (yes/no)',
  ],
  skills: ['List skills grouped by: frontend, backend, tools'],
  experience: ['For each role: company, title, start/end dates, description'],
  social: ['GitHub URL', 'LinkedIn URL', 'Contact email', 'Twitter/X URL (optional)'],
  services: ['Sanity project ID (after CMS setup)', 'Web3Forms access key (for contact form)'],
};
