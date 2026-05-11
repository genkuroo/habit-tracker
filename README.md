# Cloud Habit Tracker

A personal habit and mood tracker built on Cloudflare. Project #1 of a two-project cloud-architecture learning arc — this one runs on Cloudflare (Pages + Workers + KV/D1); a follow-up project ports the same app to AWS.

## Status

| Phase | Description | Done |
|---|---|---|
| 1 | Static site on Cloudflare Pages | ✓ |
| 2 | Serverless API endpoint (Pages Functions) | ✓ |
| 3 | Persistent storage (Cloudflare KV) | ✓ |
| 4 | Auth + mood tracking (Worker secrets, middleware) | — |
| 5 | D1 analytics + portfolio polish | — |

## Live demo

<https://habit-tracker-cja.pages.dev>

### API endpoints

| Method | Path | Returns |
|---|---|---|
| GET | `/api/health` | `{ status, time }` — liveness check |
| GET | `/api/habits` | array of habit objects |
| POST | `/api/habits` | creates a habit (body: `{ name, category }`); returns the created habit |
| DELETE | `/api/habits/:id` | deletes a habit by id; returns 204 |

## Phase 3: persistence with KV

Habits are stored in **Cloudflare KV**, a globally-distributed key-value store. Each habit is one key: `habit:<uuid>` → JSON value. The function lists keys with the `habit:` prefix and reads them in parallel.

The binding is declared in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "HABITS"
id = "…"
preview_id = "…"
```

At runtime, Cloudflare injects the namespace into the function as `env.HABITS`. No connection strings, no auth — the binding *is* the credential.

### Why KV (and not a SQL database yet)?
KV is the right primitive for "give me this thing by ID, fast, from anywhere on the planet." Reads hit a regional cache, so a habit list loads in single-digit ms globally. The trade-off is eventual consistency (a write may take up to ~60s to be visible everywhere) and no aggregations — both of which we'll feel the limits of in Phase 5 (D1).

### Inspecting KV from the terminal
```bash
wrangler kv key list --binding=HABITS --remote
wrangler tail   # stream live function logs while clicking the UI
```

## Local preview

Now that there are Pages Functions, use `wrangler` instead of a plain static server — it runs the `functions/` code locally too:

```bash
npx wrangler pages dev public
# then visit http://localhost:8788
```

(Static-only preview still works with `python3 -m http.server --directory public 8000`, but the `/api/*` calls will fail.)
