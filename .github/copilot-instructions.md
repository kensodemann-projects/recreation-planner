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

### Data Access Pattern

Each route area has a `data.ts` marked `'use server'` that follows a two-layer structure:

1. **Private query builders** — functions that take a `SupabaseClient` and return a Supabase query object (not yet awaited).
2. **Exported async functions** — call `isNotLoggedIn()` as an auth guard, create the client, build the query, and pass it through `executeQuery<T>()` from `utils/data.ts`. The `executeQuery` wrapper handles errors and returns `null` on failure.

All mutations use `convertToEntityDTO()` before insert/update, and all results are converted via `convertToEntity()` from `models/convert/`.

### Branching Workflow

Uses a hybrid git-flow:

1. Create a base branch per feature.
2. Create sub-branches off the base for each change; open PRs with **Squash Commits** back into the base.
3. Run `pnpm changeset` on each sub-branch to document the change.
4. When the feature is complete, open a PR from the base branch into `main` — **do not squash** this merge.

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

To run a single test file: `pnpm test -- path/to/file.spec.tsx`  
To run tests matching a name pattern: `pnpm test -- -t "test name"`

## Testing

- **Runner/Env**: Vitest with jsdom (see `vitest.config.ts` and `vitest.setup.ts`).
- **RTL usage**: For server components that return JSX, tests often `await` the page function then `render(jsx)`.
- **Module mocks**:
  - Supabase: `vi.mock('@/utils/supabase/auth')`, `vi.mock('@/utils/supabase/server')`, `vi.mock('@/utils/supabase/client')` with implementations in `utils/supabase/__mocks__/`.
  - Next.js: `vi.mock('next/navigation')` (and mock `next/link` when needed) for navigation behavior.
- **Test layout**: Co-located `__tests__/*.spec.tsx` near the page/components they verify.
- **Timers**: Use `vi.useFakeTimers()` where time-dependent logic is tested.

### TDD vs. Testing Existing Functionality

You may be asked to create tests for or test plans for features that do not exist yet. **Do Not** implement the features, only the tests (or the plans) and clearly indicate whether the test is TDD or testing existing functionality.

- **TDD**: Feature doesn't exist yet — tests will fail initially, and **that is expected and OK**. Note what code changes are needed to make them pass (e.g., "This test will fail until `updateEquipment` is called instead of `addEquipment`").
- **Existing functionality**: Tests should pass immediately (or reveal bugs). Reference the existing code that implements the behavior.

### Test Planning Workflow

When asked to create a test plan for TODO comments (e.g., "create a test plan for TODOs in @file"):

#### Process

1. **Search for TODO comments**: Look for comments matching the pattern `TODO: Copilot <description>` in the specified file(s)
2. **Analyze context**: Examine the surrounding test structure:
   - Parent describe blocks and their purpose
   - Related test cases (before/after the TODO)
   - Setup and teardown code (beforeEach/afterEach)
   - Mock configurations and test data used
3. **Find reference patterns**: Search the same test file for similar test cases that:
   - Test comparable functionality
   - Use similar component interactions
   - Follow the same assertion patterns
4. **Understand component behavior**: If testing Vue components, examine the source component file to understand:
   - Event handlers and emitted events
   - Props and their usage
   - Conditional rendering logic (v-if, v-show)
   - Data flow between components
5. **Determine implementation status**: Check if the feature being tested exists in the source code
   - If feature exists: Tests can be implemented immediately
   - If feature missing: Note that tests will fail until feature is implemented (TDD approach)
6. **Create PLAN.md**: Generate a detailed plan file in the same directory as the test file

#### PLAN.md Structure

For each TODO test case, include: test location (line number and describe block hierarchy), context (scenario, user workflow, and implementation status), setup steps (mock data, mounting, async considerations), test actions (interactions, queries, event emissions), assertions (visibility, props, DOM state, mock calls), pattern references (similar tests by line number, test data used), and key implementation notes (relevant source code, what needs to be implemented for TDD tests).

Use clear markdown with headers and code blocks. Make it detailed enough that implementation is straightforward. Do not modify any code — only create the PLAN.md file.

#### Workflow and Implementation

The expected workflow is:

1. Create PLAN.md (do not implement tests yet)
2. User reviews and potentially modifies PLAN.md
3. User instructs you to implement tests from the plan

When implementing, always read the current PLAN.md first — the user may have modified it. Do not rely on the original TODO comments alone.

- For TDD tests: implement the failing tests as written; failing is expected — note what code changes are needed to make them pass
- For existing functionality tests: tests should pass; if they don't, investigate and explain why.

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

Templates for Feature, Task, and Bug issues are in `.github/ISSUE_TEMPLATE/`. Read the appropriate template before creating or suggesting issues to ensure the correct structure and frontmatter.

**Subtasks**: When generating subtasks, **DO NOT create files**. Instead, output the complete markdown for each subtask in the chat first for review. When asked, create the GitHub issues using the `gh` CLI. Link subtasks to the parent using the issue number (e.g., "Related to #123").

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
