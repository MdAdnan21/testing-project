import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('#withOptGroup');
});

test('TC01 - Placeholder should be visible before selection', async ({ page }) => {
  await expect(page.locator('#withOptGroup')).toContainText('Select Option');
  await expect(page.locator('#selectOne')).toContainText('Select Title');
});

test('TC02 - User can select option from Select Value dropdown', async ({ page }) => {
  await page.locator('#withOptGroup').click();

  const option = page.locator('.css-1n7v3ny-option', { hasText: 'Group 1, option 1' });
  await option.waitFor({ state: 'visible' });
  await option.click();

  const value = await page.locator('#withOptGroup').textContent();
  await expect(value).toContain('Group 1, option 1');
});

test('TC03 - User can select option from Select One dropdown', async ({ page }) => {
  await page.locator('#selectOne').click();

  const option = page.locator('.css-1n7v3ny-option', { hasText: 'Mrs.' });
  await option.waitFor({ state: 'visible' });
  await option.click();

  const value = await page.locator('#selectOne').textContent();
  await expect(value).toContain('Mrs.');
});

test('TC04 - Old Style Select works as native dropdown', async ({ page }) => {
  await page.selectOption('#oldSelectMenu', 'Blue');

  const value = await page.locator('#oldSelectMenu option:checked').textContent();
  await expect(value).toBe('Blue');
});

test('TC05 - Multi-select dropdown allows multiple selection', async ({ page }) => {
  const multiInput = page.locator('#react-select-4-input');

  await multiInput.click();
  const green = page.locator('[id^="react-select-4-option"]', { hasText: 'Green' });
  await green.waitFor();
  await green.click();

  await multiInput.click();
  const blue = page.locator('[id^="react-select-4-option"]', { hasText: 'Blue' });
  await blue.waitFor();
  await blue.click();

  const selected = await page.locator('[class*="multiValue"] span').allTextContents();

  await expect(selected).toContain('Green');
  await expect(selected).toContain('Blue');
});

test('TC06 - Standard multi-select supports multiple selection', async ({ page }) => {
  const dropdown = page.locator('#cars');

  await dropdown.selectOption(['volvo', 'audi']);

  const selected = await dropdown.locator('option:checked').allTextContents();

  await expect(selected).toContain('Volvo');
  await expect(selected).toContain('Audi');
});

test('TC07 - All dropdowns are clickable and usable', async ({ page }) => {
  await expect(page.locator('#withOptGroup')).toBeVisible();
  await expect(page.locator('#selectOne')).toBeVisible();
  await expect(page.locator('#oldSelectMenu')).toBeVisible();
  await expect(page.locator('#cars')).toBeVisible();
});
