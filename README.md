# Joshua Rio — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Contentlayer.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Contentlayer + MDX
- **Email:** Resend API
- **Analytics:** Plausible
- **Hosting:** Vercel
- **CDN/DNS:** Cloudflare

## Getting started

```bash
npm install
cp .env.local.example .env.local   # add your Resend key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project case studies

Add new projects by creating an MDX file in `content/projects/`.
Contentlayer auto-generates typed data — no database needed.

## Deployment

Push to `main` branch → Vercel auto-deploys.
Add `RESEND_API_KEY` to Vercel environment variables before deploying.

## Architecture

See `ARCHITECTURE.md` for the full system diagram.
