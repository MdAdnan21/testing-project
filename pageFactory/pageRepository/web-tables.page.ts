import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;

  // Header
  readonly title: Locator;
  readonly addButton: Locator;
  readonly searchInput: Locator;

  // Table
  readonly table: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Web Tables' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchInput = page.getByPlaceholder('Type to search');

    this.table = page.locator('table');
    this.tableHeaders = page.locator('table thead tr th');
    this.tableRows = page.locator('table tbody tr');
  }

  async verifyPageLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.addButton).toBeEnabled();
    await expect(this.searchInput).toBeVisible();
    await expect(this.table).toBeVisible();
  }

  async verifyTableColumns() {
    const expectedHeaders = [
      'First Name',
      'Last Name',
      'Age',
      'Email',
      'Salary',
      'Department',
      'Action',
    ];

    await expect(this.tableHeaders).toHaveText(expectedHeaders);
  }

  async verifyRowsHaveData() {
    const rowCount = await this.tableRows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      await expect(this.tableRows.nth(i)).toBeVisible();
    }
  }

  async verifyEditAndDeleteIcons() {
    const row = this.tableRows.first();

    await expect(row.locator('[title="Edit"]')).toBeVisible();
    await expect(row.locator('[title="Delete"]')).toBeVisible();
  }

  async searchEmployee(value: string) {
    await this.searchInput.fill(value);
    await expect(this.tableRows.first()).toContainText(value);
  }

  async clickEditFirstRow() {
    await this.tableRows
      .first()
      .locator('[title="Edit"]')
      .click();
  }

  async clickDeleteFirstRow() {
    const countBefore = await this.tableRows.count();

    await this.tableRows
      .first()
      .locator('[title="Delete"]')
      .click();

    await expect(this.tableRows).toHaveCount(countBefore - 1);
  }
}
