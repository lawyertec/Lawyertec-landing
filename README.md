# Lawyertec Landing

Landing page for Lawyertec — AI legal assistant for Mexican lawyers.

## Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS v4
- Supabase (waitlist storage)

## Getting started

```bash
npm install
cp env.example .env.local
# Add your Supabase credentials
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/waitlist.sql` in the SQL Editor
3. Copy your project URL and anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (server-only — do **not** use the service role key)

If you already created the table, run `supabase/waitlist-hardening.sql` to apply security policies.

## Deploy

Deploy to Vercel and add the same environment variables. Optionally set `ALLOWED_ORIGINS` to restrict the waitlist API to your production domain(s).

## Security

- Security headers (CSP, HSTS, X-Frame-Options, etc.) via middleware
- Waitlist API: rate limiting, honeypot, input validation, body size limits
- Supabase RLS: insert-only for anon, validated email/name constraints
- Dependabot + weekly npm audit CI
- See [SECURITY.md](./SECURITY.md) for vulnerability reporting

**Production checklist:**
- [ ] Use `SUPABASE_ANON_KEY` only (never service role on the landing page)
- [ ] Set `ALLOWED_ORIGINS` in Vercel
- [ ] Enable Vercel DDoS protection / WAF
- [ ] Enable GitHub secret scanning on the repo
