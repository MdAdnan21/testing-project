import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectMenuPage';

let selectMenu: SelectMenuPage;

test.beforeEach(async ({ page }) => {
  selectMenu = new SelectMenuPage(page);
  await selectMenu.navigate();
  await selectMenu.waitForSelectMenuToLoad();
});

test('TC01 - Placeholder should be visible before selection', async () => {
  await expect(selectMenu.withOptGroup).toContainText('Select Option');
  await expect(selectMenu.selectOne).toContainText('Select Title');
});

test('TC02 - User can select option from Select Value dropdown', async () => {
  await selectMenu.withOptGroup.click();

  const option = selectMenu.page.locator('.css-1n7v3ny-option', { hasText: 'Group 1, option 1' });
  await option.click();

  const value = await selectMenu.withOptGroup.textContent();
  await expect(value).toContain('Group 1, option 1');
});

test('TC03 - User can select option from Select One dropdown', async () => {
  await selectMenu.selectOne.click();

  const option = selectMenu.page.locator('.css-1n7v3ny-option', { hasText: 'Mrs.' });
  await option.click();

  const value = await selectMenu.selectOne.textContent();
  await expect(value).toContain('Mrs.');
});

test('TC04 - Old Style Select works as native dropdown', async () => {
  await selectMenu.page.selectOption('#oldSelectMenu', 'Blue');

  const value = await selectMenu.page.locator('#oldSelectMenu option:checked').textContent();
  await expect(value).toBe('Blue');
});

test('TC05 - Multi-select dropdown allows multiple selection', async () => {
  const multiInput = selectMenu.page.locator('#react-select-4-input');

  await multiInput.click();
  await selectMenu.page.locator('[id^="react-select-4-option"]', { hasText: 'Green' }).click();

  await multiInput.click();
  await selectMenu.page.locator('[id^="react-select-4-option"]', { hasText: 'Blue' }).click();

  const selected = await selectMenu.page.locator('[class*="multiValue"] span').allTextContents();

  await expect(selected).toContain('Green');
  await expect(selected).toContain('Blue');
});

test('TC06 - Standard multi-select supports multiple selection', async () => {
  const dropdown = selectMenu.page.locator('#cars');

  await dropdown.selectOption(['volvo', 'audi']);

  const selected = await dropdown.locator('option:checked').allTextContents();

  await expect(selected).toContain('Volvo');
  await expect(selected).toContain('Audi');
});

test('TC07 - All dropdowns are clickable and usable', async () => {
  await expect(selectMenu.withOptGroup).toBeVisible();
  await expect(selectMenu.selectOne).toBeVisible();
  await expect(selectMenu.page.locator('#oldSelectMenu')).toBeVisible();
  await expect(selectMenu.page.locator('#cars')).toBeVisible();
});
