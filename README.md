# Cloud Habit Tracker

A personal habit and mood tracker built on Cloudflare. Project #1 of a two-project cloud-architecture learning arc — this one runs on Cloudflare (Pages + Workers + KV/D1); a follow-up project ports the same app to AWS.

## Status

| Phase | Description | Done |
|---|---|---|
| 1 | Static site on a custom domain (Cloudflare Pages) | in progress |
| 2 | Serverless API endpoint (Pages Functions) | — |
| 3 | Persistent storage (Cloudflare KV) | — |
| 4 | Auth + mood tracking (Worker secrets, middleware) | — |
| 5 | D1 analytics + portfolio polish | — |

## Live demo

_(URL will appear here once Phase 1 is deployed)_

## Local preview

This phase is plain HTML/CSS — no build step. Open `public/index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server --directory public 8000
# then visit http://localhost:8000
```
