# Cloud Habit Tracker

A personal habit and mood tracker built on Cloudflare. Project #1 of a two-project cloud-architecture learning arc — this one runs on Cloudflare (Pages + Workers + KV/D1); a follow-up project ports the same app to AWS.

## Status

| Phase | Description | Done |
|---|---|---|
| 1 | Static site on Cloudflare Pages | ✓ |
| 2 | Serverless API endpoint (Pages Functions) | ✓ |
| 3 | Persistent storage (Cloudflare KV) | — |
| 4 | Auth + mood tracking (Worker secrets, middleware) | — |
| 5 | D1 analytics + portfolio polish | — |

## Live demo

<https://habit-tracker-cja.pages.dev>

### API endpoints

| Method | Path | Returns |
|---|---|---|
| GET | `/api/health` | `{ status, time }` — liveness check |
| GET | `/api/habits` | array of habit objects |

## Local preview

Now that there are Pages Functions, use `wrangler` instead of a plain static server — it runs the `functions/` code locally too:

```bash
npx wrangler pages dev public
# then visit http://localhost:8788
```

(Static-only preview still works with `python3 -m http.server --directory public 8000`, but the `/api/*` calls will fail.)
