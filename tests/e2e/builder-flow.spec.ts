import { test, expect } from "@playwright/test";

test.describe("Prime Era builder — happy path", () => {
  test("landing page loads and links into the builder", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Czego potrzebuje/i }),
    ).toBeVisible();

    await page.getByRole("link", { name: /Stwórz swój koktajl/i }).click();
    await expect(page).toHaveURL(/\/builder/);
  });

  test("full flow: goal -> preferences -> recipe -> swap -> shopping list -> email", async ({
    page,
  }) => {
    await page.goto("/builder");
    const acceptNecessary = page.getByRole("button", { name: /Tylko niezbędne/i });
    if (await acceptNecessary.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptNecessary.click();
    }

    // Step 1: pick a goal
    await page.getByRole("button", { name: /^Odporność/ }).click();

    // Step 2: toggle a preference, then generate
    await page.getByText("Bez orzechów", { exact: true }).click();
    await page.getByRole("button", { name: /Wygeneruj przepis/i }).click();

    // Step 3 -> 4: recipe result renders with all core sections
    await expect(page.getByText("Twój koktajl")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Lista zakupów")).toBeVisible();
    await expect(page.getByRole("button", { name: /Pobierz PDF/i })).toBeVisible();

    // Swap the first swappable ingredient for an alternative
    const swapButton = page.getByRole("button", { name: /Zamień składnik/i }).first();
    await swapButton.click();
    await expect(page.getByText("Wybierz zamiennik")).toBeVisible();
    const firstCandidate = page.locator('[data-slot="sheet-content"] button').first();
    await firstCandidate.click();
    await expect(page.getByText("Wybierz zamiennik")).not.toBeVisible();

    // Check off a shopping list item
    const firstItem = page.locator("li button").first();
    await firstItem.click();

    // Move to email capture and submit
    await page.getByRole("button", { name: /Zapisz przepis na e-mail/i }).click();
    await page.getByPlaceholder("twoj@email.pl").fill("test@example.com");
    await page.locator("#builder-consent").click();
    await page.getByRole("button", { name: /Wyślij przepis/i }).click();
    await expect(page.getByText("Gotowe!")).toBeVisible({ timeout: 10_000 });
  });

  test("goal landing pages render with a working CTA into the builder", async ({ page }) => {
    await page.goto("/cele/jelita");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.getByRole("link", { name: "Stwórz koktajl Jelita" }).click();
    await expect(page).toHaveURL(/\/builder\?goal=jelita/);
  });
});
