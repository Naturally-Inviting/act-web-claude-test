---
description: Implement a GitHub issue end-to-end (read → plan → branch → verify → PR)
argument-hint: <issue-number>
---

# Implement issue #$ARGUMENTS

You are running the issue-driven workflow defined in `CLAUDE.md`. The bar is
"boring, working, verifiable." Stay scoped to issue **#$ARGUMENTS** — do not
fix unrelated things you happen to notice.

## 1. Read the issue

Use the built-in GitHub tool `mcp__github__issue_read` to fetch issue
**#$ARGUMENTS**. Read the body, comments, labels, and any linked
issues/PRs. If the request is ambiguous, **stop and ask** before going
further. Do not guess intent.

## 2. Propose a plan

Enter plan mode and propose a concrete approach grounded in:

- the issue body and comments,
- the conventions in `CLAUDE.md` and `AGENTS.md`,
- the actual files in the repo (read what you'll touch).

The plan should name the files you intend to change, the tests you'll
add or update, and whether the change affects rendered output (which
determines whether `npm run e2e` is required). Wait for explicit
confirmation before editing any source files.

## 3. Create the branch

Once the plan is approved, create a branch named:

```
issue-$ARGUMENTS-<short-slug>
```

`<short-slug>` is 2–4 kebab-case words summarizing the change (e.g.
`issue-42-fix-header-overflow`). Never push to `main`.

## 4. Implement, with `npm run check` between meaningful changes

Make the change in small, reviewable steps. After each meaningful step,
run:

```
npm run check
```

This runs typecheck → lint → vitest → next build, in that order. If it
fails, **fix the actual problem.** The forbidden shortcuts in
`CLAUDE.md` (silencing the type checker, disabling lint, skipping
tests, swallowing errors) apply here too.

## 5. Run `npm run e2e` if the change affects rendered output

If your change touches a page, layout, component, or anything visible
in the browser, run:

```
npm run e2e
```

If it's a pure non-UI change (utility functions, config, types,
internal modules with no rendered output), skip it and say so
explicitly when you report status.

## 6. Open the PR

When `npm run check` passes (and `npm run e2e` if applicable), commit
and push the branch, then open a PR:

- **Title:** a short, conventional-style summary (e.g.
  `fix: header overflows on narrow viewports`).
- **Body:** use the repo's PR template at
  `.github/pull_request_template.md`. Fill in *What changed* and
  *How it was verified* honestly — name the commands you ran and
  whether `npm run e2e` was needed. Tick the checklist box only if
  `npm run check` actually passed locally.
- **Closes line:** include `Closes #$ARGUMENTS` in the body so the
  issue auto-closes on merge.
- **Session URL (for traceability):** if the environment variable
  `CLAUDE_CODE_REMOTE_SESSION_ID` is set **and** starts with the
  prefix `cse_`, add a line to the PR body:

  ```
  Session: https://claude.ai/code/${CLAUDE_CODE_REMOTE_SESSION_ID/#cse_/session_}
  ```

  Compute this at PR-creation time. If the variable is unset or the
  prefix doesn't match, **omit the line entirely** — don't paste a
  broken or speculative link.

## 7. Confirm CI is green

After the PR is open, watch CI. Both jobs must pass:

- `check` (typecheck + lint + vitest + next build)
- `e2e` (Playwright)

If either job fails, investigate the actual cause and push a fix.
Don't disable, skip, or mark-as-flaky to make a red light go green.

Report back when both jobs are green and the PR is ready for review.
