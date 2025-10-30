import { test, expect } from '../../../fixtures/Smoke/login_fixtures';
import * as AdminPage from '../../../pages/admin_page';
import * as TestConst from './TestConst';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('login checks',
  {
    //tagged as smoke so this can be run as a group or run in a CI environment via the tag.
    tag: '@Smoke',
    annotation: {
      type: 'Bugging DB',
      description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
    },
  },
  () => {

    test('login functions as expected', async ({ page, admin }) => {
      //call the const from the fixtures page.
      const { AFTER_LOGIN } = admin;
      //go directly to the admin page via the URL.
      await page.goto(AdminPage.URL_STUB);
      //login using the login function and the admin username and password.
      await AdminPage.login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

      await expect(AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.ROOMS, 'check that the uppertool bar contains "rooms" which can only be seen after logging in').toBeVisible();
      //log back out
      await AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.LOGOUT.click();
    });

    test('incorrect details login functions as expected', async ({ page, admin }) => {
      //call the const from the fixtures page
      const { LOGIN_PAGE } = admin;
      //go directly to the admin page via the URL
      await page.goto(AdminPage.URL_STUB);
      //Attempt to login using invalid details which are called from the const file.
      await AdminPage.login(page, TestConst.INCORRECT_LOGIN.USERNAME, TestConst.INCORRECT_LOGIN.PASSWORD);

      await expect(LOGIN_PAGE.INVALID_LOGIN, 'check the invalid login is working').toBeVisible();
    });

    test('logout works as intended', async ({ page, admin }) => {
      //get the const from the fixtures file
      const { AFTER_LOGIN } = admin;
      //go directly to the admin page via the URL
      await page.goto(AdminPage.URL_STUB);
      //use the login function
      await AdminPage.login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
      //click logout - this test is specifically testing the logout, however if there was an issue with logging out it would be covered by the first test in the file - having this crossover is not a bad thing though.
      await AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.LOGOUT.click();
    });
  }
);