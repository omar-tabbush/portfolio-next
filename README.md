# Omar Tabboush — Portfolio (Next.js)

Production-grade portfolio with a built-in admin dashboard, built on **Next.js 15 + React 19 (App Router)**. The public homepage is a Server Component that streams from the edge — only the interactive bits (cursor, role cycler, scroll observers, project hover) ship JS to the browser.

## Stack

- **Next.js 15** App Router with React Server Components (RSC)
- **Server Actions** for all dashboard mutations — no custom RPC layer
- **Drizzle ORM + LibSQL** — local SQLite file in dev, **Turso** in production
- **next/font** for self-hosted Geist + JetBrains Mono (no Google Fonts CDN roundtrip, zero CLS)
- **Zod** for input validation
- HMAC-signed cookie auth (no third-party auth lib)

## Why this is fast

- **Static generation + on-demand ISR** — the public page is rendered once and served from Vercel's edge. Dashboard saves call `revalidatePath('/')` so visitors see fresh content on the next request.
- **RSC by default** — `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Stack`, `Contact`, and `BigFooter` are all Server Components. Zero JS for those.
- **Single delegated observer** — instead of one `useEffect` per `<Reveal>`, a single client island (`Observers.tsx`) sets up one IntersectionObserver for every `.reveal` element and one delegated `mouseover` listener for every `[data-scramble]`. Massive bundle savings vs. per-component effects.
- **Self-hosted fonts** via `next/font` — no render-blocking request to fonts.gstatic.com.
- **server-only** marker on every DB / auth file — Next refuses to bundle them into the client at all.

## SEO

- `generateMetadata` reads SEO settings from the DB → produces `<title>`, `<meta description>`, OpenGraph, Twitter cards, and a canonical URL.
- Inline JSON-LD `Person` + `WebSite` structured data (with `alternateName` aliases for common name misspellings).
- Built-in `app/sitemap.ts` and `app/robots.ts` conventions — Next auto-routes them at `/sitemap.xml` and `/robots.txt`.
- Semantic HTML throughout: `<main>`, `<article>`, `<h1>`/`<h2>`/`<h3>` hierarchy.

## Local setup

```bash
pnpm install
cp .env.example .env
# fill in DASHBOARD_PASSWORD and DASHBOARD_SECRET
pnpm db:push   # creates local.db
pnpm db:seed   # loads default content
pnpm dev       # http://localhost:3000
```

Dashboard at `/dashboard` (redirects to `/login` first).

## Deploying to Vercel

1. Create a Turso DB at [turso.tech](https://turso.tech) (free tier).
2. Push to GitHub, import in Vercel.
3. Set env vars in Vercel project settings:
   - `DASHBOARD_PASSWORD` — admin password
   - `DASHBOARD_SECRET` — 32 random bytes (`openssl rand -hex 32`)
   - `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` — from Turso
   - `NEXT_PUBLIC_SITE_URL` — your production URL (e.g. `https://omartabboush.com`)
4. After first deploy, point your local `.env` at Turso and run `pnpm db:push && pnpm db:seed`.

## Project layout

```
src/
├── app/
│   ├── layout.tsx                # root: fonts + minimal shell
│   ├── page.tsx                  # public portfolio (RSC + ISR)
│   ├── globals.css               # design tokens + portfolio styles
│   ├── sitemap.ts                # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   ├── login/                    # password gate
│   └── dashboard/                # CRUD pages, all server-actioned
│       ├── dashboard.css
│       ├── layout.tsx            # auth gate + sidebar
│       ├── page.tsx              # overview
│       ├── hero/                 # hero + about settings
│       ├── skills/
│       ├── projects/
│       ├── experience/
│       ├── stack/
│       ├── contacts/
│       └── seo/
├── components/
│   ├── portfolio/                # mostly RSC, narrow client islands
│   └── dashboard/
└── lib/
    ├── auth.ts                   # signed-cookie session
    ├── content.ts                # SSR loader
    ├── mutations.ts              # CRUD helpers + zod schemas
    └── db/
        ├── schema.ts
        ├── client.ts
        ├── defaults.ts
        └── seed.ts
```

## Post-deploy SEO checklist

1. Verify your domain in Google Search Console; submit `/sitemap.xml`.
2. Add a backlink from your GitHub profile README and LinkedIn "Featured" — single biggest lever for ranking on a name query.
3. Keep your name spelling consistent online; the JSON-LD already aliases common variants.

## License

All yours.
