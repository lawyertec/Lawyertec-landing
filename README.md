# Lawyertec Landing

Landing page for Lawyertec — AI legal assistant for Mexican lawyers.

## Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS v4
- Supabase (waitlist storage)
- Payload CMS (landing content at `/admin`)

## Getting started

```bash
npm install
cp env.example .env
# Add Supabase + Payload credentials (see env.example)
npx payload migrate   # first time only — creates CMS tables
npm run seed            # optional — loads default copy + admin user
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). CMS admin: [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin).

Editors: see [docs/editing-content.md](./docs/editing-content.md) (Spanish).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/waitlist.sql` in the SQL Editor
3. Copy your project URL and anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (server-only — do **not** use the service role key)

If you already created the table, run `supabase/waitlist-hardening.sql` to apply security policies.

## Deploy

Deploy to Vercel and add environment variables from `env.example`:

- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`
- Payload: `DATABASE_URI`, `PAYLOAD_SECRET` (required — app fails to start without them)
- Media uploads: `BLOB_READ_WRITE_TOKEN` (Vercel Blob store)
- **Required:** `ALLOWED_ORIGINS`, `NEXT_PUBLIC_SITE_URL` (waitlist + Payload CORS/CSRF)
- **Required before go-live:** `PAYLOAD_SEED_EMAIL` + `PAYLOAD_SEED_PASSWORD`, then `npm run seed` (closes first-register)
- Optional: `VERCEL_DEPLOY_HOOK_URL` (rebuild site when CMS content is saved)

Build runs `payload generate:importmap`, `payload migrate`, then `next build`.

Editors: see [docs/editing-content.md](./docs/editing-content.md) — includes Live Preview and drag-and-drop images.

## Security

- Payload CMS: CORS/CSRF allowlists, secure auth cookies in production, `maxDepth` cap on API queries
- Security headers (CSP, HSTS, X-Frame-Options, etc.) via proxy middleware; safe headers on `/admin`
- Waitlist API: rate limiting, honeypot, input validation, body size limits
- Supabase RLS: insert-only for anon, validated email/name constraints
- Dependabot + weekly npm audit CI
- See [SECURITY.md](./SECURITY.md) for vulnerability reporting

**Production checklist:**
- [ ] Use `SUPABASE_ANON_KEY` only (never service role on the landing page)
- [ ] Set `DATABASE_URI`, `PAYLOAD_SECRET`, and `BLOB_READ_WRITE_TOKEN` in Vercel
- [ ] Set `ALLOWED_ORIGINS` and `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Run `npm run seed` with `PAYLOAD_SEED_EMAIL`/`PAYLOAD_SEED_PASSWORD` before or immediately after first deploy
- [ ] Set `VERCEL_DEPLOY_HOOK_URL` for CMS publish → rebuild
- [ ] Enable Vercel DDoS protection / WAF
- [ ] Enable GitHub secret scanning on the repo
