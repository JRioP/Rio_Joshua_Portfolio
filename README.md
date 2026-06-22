# Joshua Rio — Portfolio

Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4.
Showcases full-stack projects across Android, web, and AI.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** next-mdx-remote + gray-matter (MDX)
- **Email:** Resend API
- **Analytics:** Plausible
- **Hosting:** Vercel
- **CDN/DNS:** Cloudflare

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.local.example .env.local   # add your Resend API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project case studies

Project content lives in `content/projects/` as MDX files. Each file has
frontmatter (title, description, tags, category, slug) plus markdown content.

At build time, `lib/mdx.ts` reads these files, parses the frontmatter with
gray-matter, and statically generates a page per project — no database needed.

To add a new project, create a new `.mdx` file in `content/projects/` with the
required frontmatter, then run `npm run build`. It's automatically added to the
home page (if `featured: true`), the projects list, and its own case study page.

## Deployment

Push to the `main` branch → Vercel auto-deploys.
Add `RESEND_API_KEY` to Vercel environment variables before deploying.

## Architecture

<img width="1645" height="973" alt="Rio_Portfolio_Final" src="https://github.com/user-attachments/assets/2668d09b-f734-4189-a103-5e23c2ddffe4" />
Vercel, and the Next.js app, plus content sourcing and email delivery.
