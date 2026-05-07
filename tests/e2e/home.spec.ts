import { expect, test } from "@playwright/test";

test("home route responds with 200", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
});
