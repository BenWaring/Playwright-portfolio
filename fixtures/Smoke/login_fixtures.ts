import { test as base, expect, type Page } from '@playwright/test';
import * as AdminPage from '../../pages/admin_page';
import * as dotenv from 'dotenv';
dotenv.config();

function createAdminContext(page: Page) {
  const AFTER_LOGIN = new AdminPage.AdminUpperToolbarAfterLogin(page);
  const LOGIN_PAGE = new AdminPage.Login(page);

  return {
    AFTER_LOGIN,
    LOGIN_PAGE,
  };
}

export const test = base.extend<{
  admin: ReturnType<typeof createAdminContext>;
}>({
  admin: async ({ page }, use) => {
    const CONTEXT = createAdminContext(page);
    await use(CONTEXT);
  },
});

export { expect };