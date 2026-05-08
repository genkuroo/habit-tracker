# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A personal habit/mood tracker built phase-by-phase on Cloudflare's edge stack. Goal is to learn cloud architecture: static hosting → serverless API → managed datastore → auth → analytics.

This is Project #1 of a two-project arc. Project #2 will port the same app to AWS (S3 + Lambda + DynamoDB) — the architecture concepts transfer; the service names change.

The full plan lives at `~/.claude/plans/yes-lets-plan-it-delegated-lobster.md`.

## Stack (as it grows)

- **Phase 1**: Cloudflare Pages, vanilla HTML/CSS/JS, custom domain
- **Phase 2**: + Pages Functions (serverless API), `wrangler` CLI
- **Phase 3**: + Cloudflare KV (persistence)
- **Phase 4**: + Worker secrets, middleware-based auth
- **Phase 5**: + Cloudflare D1 (SQLite for analytics)

## Project layout

```
cloud-habit-tracker/
├── public/             # static frontend (served by Pages)
│   ├── index.html
│   └── style.css
├── functions/          # serverless API (added in Phase 2)
│   └── api/
├── migrations/         # D1 SQL migrations (added in Phase 5)
├── wrangler.toml       # Cloudflare config (added in Phase 2)
├── README.md
└── CLAUDE.md
```

## Conventions

- **No build step.** Vanilla HTML/CSS/JS only. No npm dependencies for app code (only for `wrangler` CLI).
- **Bindings live in `wrangler.toml`**, never the dashboard. The file is the source of truth.
- **Secrets via `wrangler secret put`**, never in `wrangler.toml` or `.env` files committed to git. Local secrets go in `.dev.vars` (gitignored).
- **Pages Functions filesystem routing:** `functions/api/foo.js` → `/api/foo`. `[[id]].js` is catch-all; `[id].js` is single-segment. Methods come from named exports (`onRequestGet`, `onRequestPost`).
- **`wrangler d1 execute` defaults to local;** always use `--remote` for production operations.

## Common commands

Once Phase 2+ is in place:

```bash
wrangler login                          # one-time auth
wrangler pages dev public --persist     # local dev, persists KV between runs
wrangler tail                           # stream live logs from production
wrangler kv key list --binding=HABITS --remote
wrangler d1 execute habit-tracker-db --command="SELECT ..." --remote
```
