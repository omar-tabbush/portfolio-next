// Default content. Used as a fallback when DB is empty/unreachable, and as the
// initial dataset for `pnpm db:seed`.

export const DEFAULT_SKILLS = [
  { letter: "A", title: "Backend Architecture", description: "Service design, API boundaries, async workflows, background jobs. Built for horizontal scale, not heroic scaling." },
  { letter: "B", title: "Database Design", description: "Schema modeling in PostgreSQL, MySQL, SQLite. Query shape matters more than the ORM. Indexes earned, not sprinkled." },
  { letter: "C", title: "Performance & Refactoring", description: "Led incremental re-architecture of legacy monoliths. Measure, isolate, replace. No big-bang rewrites." },
  { letter: "D", title: "LLM Integration", description: "OpenAI GPT workflows for structured extraction, scraping, and content pipelines. Prompts as code, tested like code." },
  { letter: "E", title: "Frontend Engineering", description: "React, Next.js, TypeScript, Tailwind. SSR, SEO, and the unglamorous parts of shipping UI that actually converts." },
  { letter: "F", title: "Third-party APIs", description: "Stripe, Tap, Meta Graph, LinkedIn. Resilient integrations with retries, idempotency, webhook replay — the stuff docs skip." },
  { letter: "G", title: "DevOps & Infra", description: "AWS EC2, S3, container deploys, CI pipelines. Enough to own the stack end-to-end without needing to file a ticket." },
  { letter: "H", title: "AI Pair Programming", description: "Working alongside Claude Opus and Copilot agents. Offloading boilerplate, staying senior on architecture and review." },
];

export const DEFAULT_PROJECTS = [
  {
    idx: "001", name: "Hawen", italic: " / Enterprise SaaS",
    blurb: "Architected the complete NestJS + TypeScript backend — 25+ domain modules covering users, vehicles, packages & payments. Migrated Stripe → Tap Payment with full webhook, refund & cancellation flow. Real-time analytics, rate limiting, Discord error alerts, Twilio SMS and email integrations.",
    year: "2024–25", stack: "NestJS · TypeScript · Prisma · PostgreSQL",
    tags: ["Backend", "Payments", "Architecture"], accent: "lime",
  },
  {
    idx: "002", name: "MyBooq", italic: ".ai",
    blurb: "AI-powered e-commerce platform. Built the Next.js shopfront and async backend services, integrating OpenAI GPT workflows for structured data extraction and automated product processing pipelines.",
    year: "2025", stack: "Next.js · Python · OpenAI",
    tags: ["AI", "Next.js", "E-commerce"], accent: "amber",
  },
  {
    idx: "003", name: "Global Farms", italic: " / SaaS",
    blurb: "Multi-tenant ag-SaaS platform. Led incremental re-architecture of the backend and database layer — migrating to scalable patterns without breaking production.",
    year: "2024–Now", stack: "Node · PostgreSQL",
    tags: ["SaaS", "Refactor", "Backend"], accent: "blue",
  },
  {
    idx: "004", name: "The Ready Hand", italic: "",
    blurb: "Led backend development and resolved runtime-critical production issues. Shipped structured API endpoints, improved performance, and kept the frontend/backend integration + deploy pipeline healthy.",
    year: "2024", stack: "Node · REST APIs",
    tags: ["Backend", "APIs", "Performance"], accent: "red",
  },
  {
    idx: "005", name: "VBOUT", italic: " / Marketing",
    blurb: "Email & landing-page builder at a marketing automation SaaS. Led Meta & LinkedIn integrations, hardened builder backend performance, shipped dashboard logic.",
    year: "2023–24", stack: "React · PHP (YII) · jQuery",
    tags: ["SaaS", "Integrations", "Builder"], accent: "lime",
  },
  {
    idx: "006", name: "CryptoUniversity", italic: " / first ever",
    blurb: "My first project ever. Designed backend architecture for a crypto education platform, built REST APIs, integrated third-party services, and shipped production systems with a team of four.",
    year: "2023", stack: "Node · REST",
    tags: ["First project", "Architecture"], accent: "amber",
  },
];

export const DEFAULT_EXPERIENCE = [
  {
    period: "Feb 2024 — Present", isCurrent: true,
    role: "Software Developer", company: "@ Techquarters",
    notes: [
      "Contributing to backend & frontend architecture for Global Farms",
      "Incrementally refactored backend + database layer for scale",
      "Collaborated across teams to raise code quality & standards",
      "Optimized API performance, paid down legacy debt",
    ],
  },
  {
    period: "Jun 2025 — Present", isCurrent: true,
    role: "Software Developer", company: "@ Bytewise Coding",
    notes: [
      "Built AI-powered e-commerce scraping using OpenAI + Python",
      "Shipped MyBooq.ai backend & frontend in Next.js",
      "LLM workflows for structured extraction & processing",
      "Async backend services for scraping + AI pipelines",
    ],
  },
  {
    period: "May — Aug 2024", isCurrent: false,
    role: "Backend Developer", company: "@ Techkinks",
    notes: [
      "Led backend for The Ready Hand on Payload CMS",
      "Resolved runtime-critical production issues",
      "Shipped structured API endpoints, improved CMS performance",
      "Maintained frontend/backend integration + deploys",
    ],
  },
  {
    period: "Jun 2023 — Jan 2024", isCurrent: false,
    role: "Software Developer", company: "@ VBOUT",
    notes: [
      "Built & maintained email + landing-page builders (React / PHP YII)",
      "Led social media integrations — Meta & LinkedIn APIs",
      "jQuery dashboard logic, builder backend performance",
      "Partnered with frontend team on scalable builder infrastructure",
    ],
  },
  {
    period: "Feb — May 2023", isCurrent: false,
    role: "Full-Stack Developer", company: "@ Al Markaz Studio",
    notes: [
      "Designed backend architecture for CryptoUniversity",
      "Built REST APIs + third-party integrations",
      "Shipped production systems with a team of 4",
    ],
  },
];

export const DEFAULT_STACK = [
  { category: "Backend", items: ["Express.js", "Nest.js", "Hono.js", "Node", "Python"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "Prisma", "Drizzle"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"] },
  { category: "DevOps", items: ["AWS EC2", "S3", "Docker", "CI/CD"] },
  { category: "Integrations", items: ["Stripe", "Tap Payment", "Meta Graph API", "LinkedIn API", "OpenAI"] },
  { category: "AI Pairing", items: ["Claude Opus", "Copilot agents", "LLM subagents"] },
];

export const DEFAULT_CONTACTS = [
  { label: "Email", value: "omartabbush02@gmail.com", href: "mailto:omartabbush02@gmail.com" },
  { label: "Phone", value: "+961 70 419 748", href: "tel:+96170419748" },
  { label: "GitHub", value: "github.com/omar-tabbush", href: "https://www.github.com/omar-tabbush" },
  { label: "LinkedIn", value: "in/omar-tabboush", href: "https://www.linkedin.com/in/omar-tabboush/" },
];

export const DEFAULT_SETTINGS: Record<string, string> = {
  heroVariant: "cycle",
  theme: "dark",
  accent: "lime",
  availableText: "Available — Q3 2026",
  heroKickerVersion: "Portfolio / 2026 — v04",
  heroLocation: "Beirut, LB",
  aboutParagraph1: "I build and scale SaaS platforms across fintech, e-commerce, marketing automation, and AI-powered products. My focus is backend architecture, performance optimization, and database design that doesn't fall over at 10× the load.",
  aboutParagraph2: "Over 3+ years I've shipped 10+ production systems, led refactoring initiatives, cleaned up legacy debt, and integrated the kind of third-party APIs that come with incomplete docs and surprises.",
  aboutBased: "Beirut, Lebanon",
  aboutRole: "Senior Full-Stack Dev",
  aboutWorking: "Remote · GMT+3",
  aboutStatus: "Taking work",
  aboutLangs: "AR · EN · FR",
  aboutEdu: "B.Sc. CS · LIU '23",
  heroFocusBlurb: "Backend architecture, scalable systems, LLM tooling",
  heroExperienceBlurb: "3+ years shipping 10+ production systems",
  heroRoleBlurb: "Senior Full-Stack Software Developer",
  contactHeadline: "Have a system that needs rearchitecting?",
  seoTitle: "Omar Tabboush — Senior Full-Stack Software Developer",
  seoDescription: "Omar Tabboush is a senior full-stack software developer in Beirut, Lebanon. Backend architecture, scalable systems, LLM integration. 3+ years shipping production SaaS platforms. Available for hire.",
  seoSiteUrl: "https://omartabboush.com",
};
