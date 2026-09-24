---
name: cloak-shield
description: A lightweight authentication backend built with Bun, Elysia and TypeScript, deployed on Vercel.
---

# Cloak Shield

Authentication backend on **Bun + Elysia + TypeScript**, deployed to **Vercel** (no Docker).

## Quick start

```bash
bun install          # also installs the Husky git hooks (needs `git init` first)
cp .env.example .env
bun run dev          # http://localhost:7164
```

Check it: `curl http://localhost:7164/health`

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Local server with auto-reload (`src/app/server.ts`) |
| `bun run verify` | Typecheck, lint, type-coverage, architecture, knip, spelling, tests |
| `bun run lint:fix` | Auto-fix formatting and lint problems |
| `bun run test` / `test:coverage` | Run the tests |
| `bun run build:check` | Proves the Vercel entry bundles correctly |
| `bun run secrets` | Scan for committed secrets |
| `bun run deps:upgrade` | Interactive dependency upgrades |

## Project layout

```
src/
├── index.ts          # Vercel entrypoint (default export). No app.listen here.
├── app/
│   ├── main.ts       # createApp(): error handler first, then routes
│   └── server.ts     # local dev server only
└── packages/
    ├── env/          # Zod-validated environment (leaf layer)
    ├── configs/      # app config built from env
    ├── middlewares/  # error handler
    ├── bootstrap/    # base routes (/ and /health)
    └── utils/        # errors, logger
tests/                # bun:test suites
```

Rules: no untyped escape hatches, explicit or implicit (use `unknown` and narrow), `@/` imports, Conventional Commits.
`bun run arch` enforces the layering above.

## Deploy on Vercel

1. Push the repo to GitHub and import it at vercel.com/new. Vercel detects Elysia from `src/index.ts`.
2. `vercel.json` already sets `bunVersion`, so the Bun runtime is used.
3. In Project Settings → Environment Variables, set at least:
   - `APP_SECRET`: unique, 32+ characters (`openssl rand -base64 48`). Production refuses to start without it.
   - Optional: `SITE_ORIGIN`, `CLIENT_ORIGIN`, `CLIENT_ORIGINS`. `SITE_ORIGIN` defaults to your Vercel domain.
4. Deploy, then open `/health` on your deployment URL.

Notes: `app.listen` is not supported on Vercel, which is why the deployed entry is `src/index.ts`.
Keep `bun.lock` committed. Run `vercel dev` if you want to test the exact Vercel behavior locally.
