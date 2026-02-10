import { test } from '@playwright/test';
import { WebTablesPage } from '../../pageFactory/pageRepository/web-tables.page';

test.describe('Web Tables – Employee Records', () => {
  let webTables: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/webtables'); // update route if required
    webTables = new WebTablesPage(page);
  });

  test('Verify Web Tables UI and functionality', async () => {
    // Page loaded
    await webTables.verifyPageLoaded();

    // Table headers
    await webTables.verifyTableColumns();

    // Data present
    await webTables.verifyRowsHaveData();

    // Action icons
    await webTables.verifyEditAndDeleteIcons();

    // Search
    await webTables.searchEmployee('Cierra');

    // // Edit
    // await webTables.clickEditFirstRow();

    // // Delete
    // await webTables.clickDeleteFirstRow();
  });
});
