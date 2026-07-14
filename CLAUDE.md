# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AccessShield India — an AI-powered digital accessibility compliance SaaS platform for Indian organisations (WCAG 2.2 AA, RPwD Act 2016, IS 17802, GIGW 3.0, SEBI 2024 circular). The product itself must meet the accessibility standards it audits for customers — treat WCAG 2.2 AA compliance as a hard requirement for all UI code, not a nice-to-have.

Full architecture reference (read before large changes): [docs/architecture/README.md](docs/architecture/README.md) — 8 documents covering system overview, monorepo layout, data/multi-tenancy, auth, scan pipelines, AI integrations, deployment, and the operational runbook. This CLAUDE.md summarizes the parts needed for day-to-day work; the docs go deeper.

## Commands

Turborepo + pnpm 9 monorepo. Always use `pnpm`, never `npm`/`yarn` (enforced by `preinstall: npx only-allow pnpm`).

```bash
pnpm install                # install (Node 20 LTS, pnpm 9 required)
pnpm dev                    # all apps via Turbo
pnpm dev:stack              # web + api only
pnpm dev:web / dev:api      # individual app
pnpm dev:stop               # kill dev processes on 3000/4000/8001
pnpm --filter @accessshield/api dev:worker         # web scan worker (separate process, required for scans to run)
pnpm --filter @accessshield/mobile-scanner dev      # mobile scan worker
pnpm --filter @accessshield/ai-service dev          # AI service (port 8001)

pnpm build                  # turbo build, all apps/packages
pnpm lint                   # turbo lint (ESLint + jsx-a11y)
pnpm type-check             # turbo type-check (tsc --noEmit, strict)
pnpm test                   # turbo test (Vitest/Jest across packages)
pnpm format                 # prettier --write

pnpm db:generate            # drizzle-kit generate (after schema.ts changes)
pnpm db:migrate             # drizzle-kit migrate
pnpm db:seed                # seed dev DB
pnpm --filter @accessshield/db db:studio            # Drizzle Studio
```

Per-package test running (each app's `test` script wraps Vitest/Jest directly):

```bash
pnpm --filter @accessshield/web test                       # vitest run
pnpm --filter @accessshield/web test:a11y                  # axe-core via vitest.a11y.config.ts
pnpm --filter @accessshield/web test:a11y src/components/dashboard/issues/   # scoped a11y run
pnpm --filter @accessshield/api test                        # vitest run
pnpm --filter @accessshield/mobile-scanner test
pnpm --filter @accessshield/ui test                          # jest --passWithNoTests
pnpm --filter @accessshield/ai-service test                  # pytest tests/ (via scripts/with-venv.sh)
pnpm --filter @accessshield/ai-service test:dlp              # pytest tests/test_dlp.py only

# Single test file, from inside the package directory:
cd apps/web && npx vitest run src/path/to/Component.test.tsx
cd apps/api && npx vitest run src/path/to/file.test.ts
```

`pnpm build --filter @accessshield/types --filter @accessshield/db --filter @accessshield/ui` must be run once before first `dev` (shared packages need a build).

### Infra dependencies (Docker)

```bash
docker compose up -d postgres redis rabbitmq tika
```

Local ports differ from defaults: **Postgres 5433** (not 5432), **AI service 8001** (not 8000). Web is 3000, API is 4000, Redis 6379, RabbitMQ 5672 (mgmt UI 15672, login `accessshield`/`accessshield`), Tika 9998.

Full first-time setup and troubleshooting: [docs/architecture/08-operational-runbook.md](docs/architecture/08-operational-runbook.md).

## Architecture

### Monorepo layout — one-way dependency rule

```
apps/
  web/            Next.js 14 App Router — marketing site + admin dashboard (port 3000)
  api/             Node/Express API + scan orchestrator + web scan worker (port 4000)
  ai-service/      Python FastAPI — Claude-powered features + document scan consumer (port 8001)
  widget/          Vanilla TypeScript CDN widget, Shadow DOM, <35KB gzipped
  mobile-scanner/  Mobile scan worker (WebdriverIO/Appium/BrowserStack), no HTTP server
packages/
  db/              Drizzle ORM schema (source of truth) + migrations
  types/           Shared TS types/enums (AccessShieldJwtClaims, ApiResponse, ProblemDetails, ...)
  ui/              Shared accessible React component library (Radix + Tailwind)
  config/          Shared ESLint/TypeScript/Tailwind presets
```

**`apps/` never gets imported by `packages/`.** Import shared types from `packages/types`, UI from `packages/ui`, DB schema from `packages/db` — never redefine types, recreate components, or hand-write raw SQL in an app.

### Three independent scan pipelines

Each has its own trigger, queue, and worker; all share Postgres for results and Redis for progress. See [docs/architecture/05-scan-pipelines.md](docs/architecture/05-scan-pipelines.md) for full sequence diagrams.

| Pipeline | Trigger                              | Queue                       | Worker                       | Engine                                     |
| -------- | ------------------------------------ | --------------------------- | ---------------------------- | ------------------------------------------ |
| Web      | `POST /api/v1/scans`                 | RabbitMQ `scans`            | `apps/api` `dev:worker`      | Playwright + axe-core + IS17802/GIGW rules |
| Document | `POST /api/v1/document-scans/upload` | Redis `document-scan-jobs`  | ai-service lifespan consumer | pdf/docx/pptx/xlsx engines + Tika          |
| Mobile   | `POST /api/v1/scans` (mobile asset)  | RabbitMQ `mobile-scan-jobs` | `apps/mobile-scanner`        | Appium/BrowserStack + MobileRuleEngine     |

The web scan worker is a **separate long-running process** from the API server (`pnpm --filter @accessshield/api dev:worker`) — scans silently queue and never complete if it isn't running.

### Auth and multi-tenancy

- Supabase Auth (PKCE) issues JWTs; a custom access-token hook injects `app_metadata.user_role` and `app_metadata.org_id` at login (SQL in `packages/db/seed/supabase-auth-hook.sql`).
- API verifies JWTs via Supabase JWKS (`apps/api/src/middleware/auth.ts`), resolves claims (`apps/api/src/lib/resolve-claims.ts`), falls back to a DB lookup by `auth_user_id` if claims are missing.
- **Every tenant table has `organisation_id`.** Every protected query must filter by `req.user.org_id` from the verified JWT — never trust `organisation_id` from request body/query params.
- RBAC roles: `super_admin`, `customer_admin`, `accessibility_officer`, `developer`, `auditor`, enforced via `requireRoles(...)` in `apps/api/src/middleware/rbac.ts`.
- API → ai-service calls use a shared-secret header (`X-Internal-Key` / `INTERNAL_AI_SERVICE_KEY`), not user JWTs.
- Full detail: [docs/architecture/04-auth-and-security.md](docs/architecture/04-auth-and-security.md).

### API conventions

- REST under `/api/v1/{resource}` — GET (list/single), POST (create), PATCH (partial update, not PUT), DELETE (soft delete: set `deletedAt`, never hard-delete).
- Errors follow RFC 7807 Problem Details: `{ type, title, status, detail, instance? }`. Success: `{ data, meta? }`. Never expose stack traces or SQL errors to clients.
- Every route validates body/params/query with Zod before touching business logic.
- Public (no-JWT) routes are explicitly under `/api/v1/public/*` or marked `// PUBLIC` in the route file.

### AI service (Claude integration)

- Endpoints: `/ai/alt-text`, `/ai/fix`, `/ai/advise`, `/ai/accessibility-statement`, plus the document-scanner routes — all behind the internal-key middleware.
- **DLP is mandatory before any Anthropic call** — `apps/ai-service/utils/dlp.py` redacts Aadhaar, PAN, Indian phone numbers, email, credit card, IFSC from content sent externally.
- Alt-text and fix suggestions are cached in Redis (`SHA-256(service:input_hash)`, 24h TTL); compliance advice is never cached (context-sensitive).
- Model/version and prompt params live in `apps/ai-service/config.py` — don't hardcode elsewhere.

### Database (Drizzle)

- `packages/db/src/schema.ts` is the single source of truth for schema; `packages/db/migrations/` is generated via `pnpm db:generate` — don't hand-edit migration SQL for schema changes, edit the schema and regenerate.
- Conventions: UUID PKs, `organisationId` FK not-null on every tenant table, `createdAt`/`updatedAt` timestamps, soft delete via nullable `deletedAt`, enums defined once in schema and imported (never redefined in apps).
- `supabase/migrations/` is a parallel path for RLS policies and auth-hook SQL (document-scanner tables use Supabase RLS as a second isolation layer beyond API-level org filtering) — keep it in sync with Drizzle migrations, they're currently maintained separately.

### Web app (Next.js App Router)

- Route groups: `app/[locale]/(marketing)/` (public, EN+HI), `app/dashboard/` (protected), `app/auth/callback/` (OAuth PKCE).
- Server Components by default; `"use client"` only for state/effects/handlers/browser APIs.
- `apps/web/middleware.ts` gates `/dashboard/*` and validates JWT claims.
- `next.config.js` rewrites `/api/v1/*` to the Express API (`localhost:4000` in dev).
- Every page needs exactly one `<h1>`, a skip link as first `<body>` child, `<main id="main-content">`, and correct heading hierarchy — these are checked by `pnpm test:a11y`, not just eyeballed.

### Widget (`apps/widget`)

Vanilla TS, no framework, esbuild, all styles injected into Shadow DOM (never leak to host page CSS, never inject `<style>` into host `<head>`). Bundle size ceiling of 35KB gzipped is a CI gate — check with `pnpm --filter @accessshield/widget build && ls -la dist/` before adding dependencies.

## Non-negotiable conventions (from `.cursorrules`)

These are treated as hard rules across the codebase, not preferences:

- **India-specific formatting:** currency in paise (integer, never float) formatted via `Intl.NumberFormat('en-IN', ...)` → `₹12,34,567` (lakh/crore grouping); dates as DD/MM/YYYY; phone validation `/^(\+91|91|0)?[6-9]\d{9}$/`.
- **IS 17802 rules** (India's ICT accessibility standard, layered on WCAG 2.1 AA) apply to scanner rule code and India-facing UI — see `.cursorrules` §5 for the specific IS-00X checks (lang codes, Devanagari Unicode, bilingual help text, session timeouts, PDF alt-HTML links).
- **Severity/status never conveyed by colour alone** — always icon + colour + text (WCAG 1.4.1). There's a standard severity badge pattern (critical/serious/moderate/minor with paired icon+bg+text+border classes) — follow it rather than inventing a new one.
- **Radix UI primitives** for Select/Dialog/Tooltip/DropdownMenu/Checkbox/RadioGroup/Switch/Tabs/Accordion/AlertDialog/Popover — never hand-build these (focus trap, ARIA, keyboard nav are easy to get subtly wrong).
- **TypeScript strict everywhere**: no `any` (use `unknown` + narrowing), no `!` non-null assertion, no `as` casting (use type guards or Zod parsing).
- **State/data libraries are fixed choices, not open questions**: TanStack Query v5 (not SWR), Zustand (not Redux/Context for global UI state), React Hook Form + Zod (not Formik), Recharts (not Chart.js), Drizzle (not Prisma/TypeORM/raw pg), amqplib (not Bull/BullMQ).
- **Pydantic v2 idioms only** in ai-service: `model_dump()` not `.dict()`, `model_validate()` not `.parse_obj()`, `str | None` not `Optional[str]`.
- **RFC 7807 for every API error response**, RBAC via `requireRoles()`, org-scoped queries via JWT `org_id` — see Auth and API conventions above.

The full `.cursorrules` has exact design tokens (colours, spacing, type scale — all pre-verified for contrast), component file structure, and ready-to-copy templates (protected route, accessible form field, modal with focus trap, severity badge, INR formatter). Check it before implementing new UI or API routes rather than re-deriving these patterns.

## CI gates (must pass before merge)

From `.github/workflows/ci.yml`: lint (ESLint + jsx-a11y), type-check (TS strict), unit tests (Vitest, all packages), accessibility tests (axe-core via vitest-axe, zero violations), Python checks for ai-service (ruff, mypy, pytest).
