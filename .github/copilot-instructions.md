# Recreation Planner Project Instructions

This is a Next.js (App Router) + React + TypeScript application using Supabase for authentication and data access. Styling uses Tailwind CSS and DaisyUI. The project is built with pnpm and tested with Vitest and React Testing Library.

## Architecture

### Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, DaisyUI
- **Backend**: Supabase (Auth, Postgres) via `@supabase/ssr` helpers
- **Build/Runtime**: Next.js (`next build`, `next start`), dev with Turbopack
- **Testing**: Vitest + @testing-library/react (+ jsdom)

### Project Structure

- `app/`: Route segments and pages (Server Components by default). Tests co-located under `__tests__/` near the route modules.
- `app/ui/`: Reusable UI building blocks used across pages.
- `utils/supabase/`: Supabase integration
  - `client.ts`: Browser client via `createBrowserClient`
  - `server.ts`: Server client via `createServerClient` with Next cookies
  - `auth.ts`: Auth helpers (e.g., `isNotLoggedIn()`)
  - `middleware.ts`: `updateSession()` for auth cookie refresh; used by root `middleware.ts`
  - `__mocks__/`: Vitest-ready mocks for Supabase helpers
- `utils/`: Shared utilities (e.g., `data.ts`, `formatters.ts`, `input-validations.ts`) with tests in `utils/__tests__/`
- `models/`: Domain models and DTO converters in `models/convert/` with dedicated tests
- `hooks/`: Custom hooks (e.g., `use-form-control.ts`) and tests
- `public/`: Static assets
- Config: `next.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`

## Key Patterns

### App Router + Components

- **Server Components by default**: Route modules under `app/` are server components unless they include `'use client'`.
- **Client Components**: Add `'use client'` for components that need state, effects, or browser-only APIs.
- **Server Actions**: Use `'use server'` modules for mutations (e.g., `app/login/actions.ts` using Supabase auth, `revalidatePath`, and `redirect`).

### Data Access & Auth

- **Supabase SSR**: Use `createClient()` from `utils/supabase/server` in server-only code (route loaders, actions). Use `utils/supabase/client` for client-side needs.
- **Auth Gate**: Use `isNotLoggedIn()` to guard server-rendered pages. Middleware `updateSession()` in the root `middleware.ts` keeps Supabase cookies in sync across requests.
- **Queries/Mutations**: Encapsulate database calls in `app/**/data.ts` using Supabase clients. Convert between models and DTOs via `models/convert/*` helpers.

### Navigation & Caching

- **Routing helpers**: Use `next/navigation` for `redirect`, `notFound`, and `revalidatePath` in server code.
- **Params in pages**: Async route components can `await` data and return JSX (tests render the resolved JSX).

### Imports & Aliases

- **Path alias**: Use `@/...` for absolute imports from the project root as configured in `tsconfig.json`.

## Development Workflow

### Environment

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Values are available from your Supabase project's API settings.

### Commands

```bash
pnpm dev       # Start dev server (Turbopack)
pnpm test      # Run tests once (Vitest)
pnpm test:dev  # Watch mode for tests
pnpm lint      # ESLint check
pnpm build     # Production build
pnpm start     # Start production server
```

## Testing

- **Runner/Env**: Vitest with jsdom (see `vitest.config.ts` and `vitest.setup.ts`).
- **RTL usage**: For server components that return JSX, tests often `await` the page function then `render(jsx)`.
- **Module mocks**:
  - Supabase: `vi.mock('@/utils/supabase/auth')`, `vi.mock('@/utils/supabase/server')`, `vi.mock('@/utils/supabase/client')` with implementations in `utils/supabase/__mocks__/`.
  - Next.js: `vi.mock('next/navigation')` (and mock `next/link` when needed) for navigation behavior.
- **Test layout**: Co-located `__tests__/*.spec.tsx` near the page/components they verify.
- **Timers**: Use `vi.useFakeTimers()` where time-dependent logic is tested.

## Release Process

1. `pnpm changeset` – Document changes in a branch.
2. Implement code, tests, open PR, review, and merge.
3. `pnpm bump` – Update versions via Changesets; commit, create tag (`vX.Y.Z`), and push with tags.
4. Deploy via your target (e.g., Vercel) with environment variables configured. For manual deployments, build with `pnpm build` and run with `pnpm start`.

## Code Conventions

- **Routes/Pages**: Files under `app/**` export default async functions returning JSX; keep server logic in server components/actions unless client interactivity is required.
- **UI Components**: Shared components live in `app/ui/`; follow existing naming and props patterns.
- **Models**: Centralize domain types and converters in `models/` and `models/convert/`.
- **Tests**: Co-locate `*.spec.ts(x)` under `__tests__/` and mock Supabase/Next modules as needed.
- **Comments**: Be minimal; explain intent and non-obvious decisions.

## GitHub Issue Templates

### Feature Request Structure

```markdown
---
name: Feature
about: I have an awesome idea
title: ''
type: feature
assignees: ''
---

# Synopsis

[Brief description of the feature]

# User stories

1. As a user, I would like to...

# Processes

[Key workflows or processes affected]

# Components

[Components/files that will be created or modified]

# Acceptance Criteria

- [ ] [Testable criteria for completion]
```

### Task Structure

```markdown
---
name: Task
about: Just do it!
title: ''
type: task
assignees: ''
---

# User Story

As a user, I would like to...

# Details

[Implementation details, technical considerations]

# Acceptance Criteria

- [ ] [Testable criteria for completion]
```

**Subtasks**: When generating subtasks, **DO NOT create files**. Instead, output the complete markdown for each subtask in the chat only. The user will manually create GitHub issues from the provided markdown. Link subtasks to the parent Feature/Task using GitHub's task list syntax or by referencing the issue number (e.g., "Related to #123").

## Pull Request Reviews

### Focus Areas

- **Security**: No hardcoded secrets; validate inputs; enforce auth checks in server actions and data loaders.
- **Performance**: Avoid N+1 queries; minimize client bundles; keep server components server-only when possible.
- **Testing**: Add/maintain coverage for data operations and routing behaviors.
- **Comments**: Minimal and purposeful; explain "why", not "what".

### Review Style

- Provide specific, actionable feedback with code examples.
- Acknowledge good patterns and creative solutions.
- Link to best-practices documentation when relevant.
- Focus on improvement, not criticism.

### Review Comment Format

**Issue:** Describe what needs attention  
**Suggestion:** Provide specific improvement with code example  
**Why:** Explain reasoning and benefits  
**Documentation:** Link to best-practices if applicable

### Review Labels

- 🔒 Security concerns (immediate attention)
- ⚡ Performance issues/optimizations
- 🧹 Code cleanup and maintainability
- 📚 Documentation gaps
- ✅ Positive feedback
- 🚨 Critical blockers
- 💭 Questions for discussion
