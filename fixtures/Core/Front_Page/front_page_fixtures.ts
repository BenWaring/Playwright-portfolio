import { test as base, expect, type Page, type Locator } from '@playwright/test';
import * as FrontPage from '../../../pages/front_page';
import * as TestConst from '../../../Tests/Core_Tests/Front_Page/TestConst';

//Reminder - need to update all tests to use fixtures, better way of having the tests run rather than constantly referrring back to the const - will have a fixture per test file.

//Helper to build all Front_Page related page objects
function createFrontPageContext(page: Page): {
  BOOKINGS: FrontPage.Bookings;
  SINGLE_ROOM: FrontPage.SingleRooms;
  CONTACT_FORM: FrontPage.Contact;
  CHECK_IN_OPTION: Locator;
  CHECK_OUT_OPTION: Locator;
} {
  const BOOKINGS = new FrontPage.Bookings(page);

  return {
    BOOKINGS,
    SINGLE_ROOM: new FrontPage.SingleRooms(page),
    CONTACT_FORM: new FrontPage.Contact(page),
    CHECK_IN_OPTION: BOOKINGS.getDateOption(page, TestConst.FRONT_PAGE.CHECKING_DATE.CHECK_IN_DATE),
    CHECK_OUT_OPTION: BOOKINGS.getDateOption(page, TestConst.FRONT_PAGE.CHECKING_DATE.CHECK_OUT_DATE),
  };
}

export const test = base.extend<{ frontPage: ReturnType<typeof createFrontPageContext>; }>({

  frontPage: async ({ page }, use, testInfo) => {
    
    const originalGoto = page.goto.bind(page);

    page.goto = async (url: string, options?: Parameters<typeof page.goto>[1]) => {
      const TIMESTAMP = new Date().toISOString().split('T')[1].split('.')[0];
      console.log(`[${TIMESTAMP}] (${testInfo.title}) Navigating to: ${url}`);
      return originalGoto(url, options);
    };

    //Build the frontPage context (page objects tied to the current page)
    const CONTEXT = createFrontPageContext(page);

    //Pass the fixture to the test
    await use(CONTEXT);
  },
});

//Re-export expect so test files can import it from this fixture
export { expect };