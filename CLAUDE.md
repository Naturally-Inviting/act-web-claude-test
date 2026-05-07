@AGENTS.md

# Working agreement

This repo is a sandbox for testing agentic workflows. The bar is "boring,
working, verifiable" — not clever.

## The one command

Run `npm run check` before every commit. It runs, in order:
typecheck → lint → vitest → next build. If it doesn't pass locally,
don't commit.

`npm run e2e` runs Playwright separately. Only run it when your change
affects rendered output (a page, a layout, anything visible). It boots
the dev server itself.

## Branching and PRs

- One issue → one branch → one PR. Never push to `main`.
- Branch name: `claude/<short-slug>` is the default convention.
- Open the PR only when the work is verified. CI must be green to merge.

## Plan-mode-first

For anything beyond a one-line change, propose a plan and wait for
confirmation before editing files. If a task is ambiguous, ask — do not
guess.

## Root-cause discipline

If a check fails, fix the actual problem. Forbidden shortcuts:

- disabling, skipping, or deleting tests to make CI green
- adding `any`, `// @ts-ignore`, or `// @ts-expect-error` to silence the
  type checker
- adding `// eslint-disable*` to silence lint
- catching and swallowing errors to make a stack trace go away

If you genuinely believe one of the above is correct, stop and ask first.

## Dependencies

Ask before adding any new runtime or dev dependency. The footprint should
grow slowly and deliberately.

## Tests

- Unit tests: `tests/unit/**/*.test.ts` — run all with `npm run test:unit`,
  one with `npx vitest run tests/unit/sanity.test.ts`.
- E2E tests: `tests/e2e/**/*.spec.ts` — run all with `npm run e2e`,
  one with `npx playwright test tests/e2e/home.spec.ts`.

## Framework conventions

`AGENTS.md` is the source of truth for Next.js conventions and is
`@`-imported above. Read `node_modules/next/dist/docs/` before writing
non-trivial Next-specific code — this Next.js may differ from your
training data.
