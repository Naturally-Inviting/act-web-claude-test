// Uses the request fixture instead of a browser-driven page test because
// Playwright browser binaries can't be downloaded in the current sandbox
// (cdn.playwright.dev is not on the network allowlist). For a fully
// server-rendered static page this is sufficient: an HTTP fetch verifies
// the route returns 200 and emits the expected HTML. Revisit this when
// we add client-side interactivity (forms, buttons, stateful client
// components) — at that point a real browser test is worth the cost of
// solving the binary-download problem.

import { expect, test } from "@playwright/test";

test("home route renders Hello, world", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Hello, world");
});
