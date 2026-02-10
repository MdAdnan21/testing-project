import { Page, Locator, expect } from '@playwright/test';

export class TabsPage {
  readonly page: Page;

  // Headings
  readonly tabsTitle: Locator;
  readonly dividerLine: Locator;
  readonly sectionLabel: Locator;

  // Tabs
  readonly tabs: Locator;
  readonly whatTab: Locator;
  readonly originTab: Locator;
  readonly useTab: Locator;
  readonly moreTab: Locator;

  // Content
  readonly tabContent: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings
    this.tabsTitle = page.getByRole('heading', { name: 'Tabs' });
    this.dividerLine = page.locator('hr');
    this.sectionLabel = page.getByText('Details about Lorem Ipsum');

    // Tabs
    this.tabs = page.locator('[role="tab"]');
    this.whatTab = page.getByRole('tab', { name: 'What' });
    this.originTab = page.getByRole('tab', { name: 'Origin' });
    this.useTab = page.getByRole('tab', { name: 'Use' });
    this.moreTab = page.getByRole('tab', { name: 'More' });

    // Content
    this.tabContent = page.locator('[role="tabpanel"]');
  }

  async verifyHeaderSection() {
    await expect(this.tabsTitle).toBeVisible();
    await expect(this.dividerLine).toBeVisible();
    await expect(this.sectionLabel).toBeVisible();
  }

  async verifyAllTabsVisible() {
    await expect(this.whatTab).toBeVisible();
    await expect(this.originTab).toBeVisible();
    await expect(this.useTab).toBeVisible();
    await expect(this.moreTab).toBeVisible();

    await expect(this.tabs).toHaveCount(4);
  }

  async verifyDefaultTab() {
    await expect(this.whatTab).toHaveAttribute('aria-selected', 'true');
    await expect(this.tabContent).toBeVisible();
  }

  async clickTabAndVerify(tab: Locator) {
    const contentBefore = await this.tabContent.boundingBox();

    await tab.click();

    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(this.tabContent).toBeVisible();

    // only one tabpanel visible
    await expect(this.page.locator('[role="tabpanel"]:visible')).toHaveCount(1);

    // layout stability check
    const contentAfter = await this.tabContent.boundingBox();
    expect(contentBefore?.height).toBe(contentAfter?.height);
  }

  async verifyActiveTabStyle(tab: Locator) {
    await expect(tab).toHaveClass(/active|selected|text-primary/);
  }
}
