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
cp .env.local.example .env.local
# Add your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/waitlist.sql` in the SQL Editor
3. Copy your project URL and keys into `.env.local`

## Deploy

Deploy to Vercel and add the same environment variables.
