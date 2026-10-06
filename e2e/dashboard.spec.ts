import { test, expect } from "@playwright/test";

test("dashboard loads and search works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Good afternoon")).toBeVisible();
  const search = page.getByLabel("Search content");
  await search.fill("AI");
  await expect(page.getByText(/Showing results for/)).toBeVisible();
});

test("dark mode toggles", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Toggle dark mode").click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
