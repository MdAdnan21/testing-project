import { Page, Locator, expect } from '@playwright/test';
//booklisttable
export class BookListTable {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly loginButton: Locator;
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Type to search');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.table = page.locator('.ReactTable');
    this.rows = page.locator('.rt-tr-group');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/books');
    await this.waitForRowsToLoad();
  }

  async waitForRowsToLoad() {
    await this.rows.first().waitFor({ state: 'visible' });
  }

  async verifyTableLoaded() {
    await expect(this.table).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async searchBook(bookName: string) {
    await this.searchInput.fill(bookName);
    await this.waitForRowsToLoad();
  }
}
