import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { InteractionsPage } from '@pages/InteractionsPage';
import { SelectMenuPage } from '@pages/SelectMenuPage';
import { WebActions } from '@lib/WebActions';
import AxeBuilder from '@axe-core/playwright';

type MyFixtures = {
  webActions: WebActions;
  loginPage: LoginPage;
  elementsPage: ElementsPage;
  alertsFrameWindowsPage: AlertsFrameWindowsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
  selectMenu: SelectMenuPage;
  makeAxeBuilder: AxeBuilder;
  testInfo: TestInfo;
};

const test = baseTest.extend<MyFixtures>({
  
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },

  selectMenu: async ({ page }, use) => {
    await use(new SelectMenuPage(page));
  },

  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },

  elementsPage: async ({ page, context }, use) => {
    await use(new ElementsPage(page, context));
  },

  alertsFrameWindowsPage: async ({ page, context }, use) => {
    await use(new AlertsFrameWindowsPage(page, context));
  },

  widgetsPage: async ({ page, context }, use) => {
    await use(new WidgetsPage(page, context));
  },

  interactionsPage: async ({ page, context }, use) => {
    await use(new InteractionsPage(page, context));
  },

  makeAxeBuilder: async ({ page }, use) => {
    await use(
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue')
    );
  },

});

export default test;
