# Hammody — Portfolio (Next.js)

Personal portfolio for **Hammody**, a Roblox UI/UX & Motion Designer.
Built with Next.js (App Router), React, Tailwind CSS, GSAP + ScrollTrigger, and Lenis smooth scroll.

## Run it locally

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Deploy

Easiest: push to GitHub and import the repo at https://vercel.com (zero config).
You can also deploy to Cloudflare Pages or Netlify using their Next.js presets.

Once deployed, update the site URL in two places so the share preview keeps working:
- `app/layout.jsx` → `metadataBase`, `openGraph.url`
- `lib/data.js` → `profile.siteUrl`

## Editing content

All copy, projects, services, testimonials, and links live in **`lib/data.js`** — edit there.

- Work screenshots: `public/work/`
- Avatars (yours + clients): `public/avatars/`
- Share image + favicon: `public/og.png`, `public/favicon.png`

## Structure

```
app/
  layout.jsx      Fonts (next/font) + SEO / Open Graph metadata
  page.jsx        Assembles all sections
  globals.css     Design system, tokens, all component styles
components/        One file per section + Nav, Loader, Cursor, Ambient
  SiteEffects.jsx  All client interactivity (GSAP, Lenis, cursor, menu)
lib/data.js        All editable content
public/            Images
```

Styling note: the visual design is authored in `globals.css` using CSS variables.
Tailwind is configured and available for any new work (preflight is disabled so it
doesn't override the existing design).
