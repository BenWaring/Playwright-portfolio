/*
Page is going to be laid out following a structure that starts in the top left and moves right before moving down the page.
This means that the first object to be captured is the "Restful Booker Platform Demo" which is a clickable button in the top left of the page.
*/
//input playwrights variables to use when building the Page Object Models
import { Page, Locator } from '@playwright/test';

//URL stub which can be used for direct navigation - will help with health checks as well as testing in the general area without needing constant navigation
export const URL_STUB = '/admin';

//Class for the Upper Toolbar section of the page
export class UpperToolbar {

    //Declare variables to use
    readonly UPPER_LEFT_RETURN: Locator;
    readonly FRONT_PAGE: Locator;
    readonly LOGOUT: Locator;

    //Build the locators used
    constructor(page: Page) {

    this.UPPER_LEFT_RETURN = page.getByRole('link', { name: 'Restful Booker Platform Demo' });
    this.FRONT_PAGE = page.getByRole('link', { name: 'Front Page' });
    this.LOGOUT = page.getByRole('button', { name: 'Logout' }); 
    
    }
}

//Class for the login box section of the page
export class Login {

    //Declare the variables to use
    readonly USER_NAME: Locator;
    readonly PASSWORD: Locator;
    readonly LOGIN: Locator;
    readonly INVALID_LOGIN: Locator;

    //Build the locators used
    constructor(page: Page) {

    this.USER_NAME = page.getByRole('textbox', { name: 'Username' });
    this.PASSWORD = page.getByRole('textbox', { name: 'Password' });
    this.LOGIN = page.getByRole('button', { name: 'Login' });
    this.INVALID_LOGIN = page.getByText('Invalid credentials');
    
    }
}

//Function for logging in - this is to be used instead of the manual login from other tests
export async function login(page: Page) {

    const LOGIN_PAGE = new Login(page);

    await page.goto(URL_STUB);
    await LOGIN_PAGE.USER_NAME.fill(process.env.ADMIN_USERNAME!);
    await LOGIN_PAGE.PASSWORD.fill(process.env.ADMIN_PASSWORD!);
    await LOGIN_PAGE.LOGIN.click();
}

//Class for the Admin sections after logging in
export class AdminUpperToolbarAfterLogin {

    readonly UPPERTOOLBAR_AFTERLOGIN: {
        ROOMS: Locator;
        REPORTS: Locator;
        BRANDING: Locator;
        MESSAGES: Locator;
        UPPER_LEFT_RETURN: Locator;
        FRONT_PAGE: Locator;
        LOGOUT: Locator;
    }

    constructor(page: Page) {

        this.UPPERTOOLBAR_AFTERLOGIN = {

            ROOMS: page.getByRole('link', { name: 'Rooms' }),
            REPORTS: page.getByRole('link', { name: 'Reports' }),
            BRANDING: page.getByRole('link', { name: 'Branding' }),
            MESSAGES: page.getByRole('link', { name: 'Messages' }),
            UPPER_LEFT_RETURN: page.getByRole('link', { name: 'Restful Booker Platform Demo' }),
            FRONT_PAGE: page.getByRole('link', { name: 'Front Page' }),
            LOGOUT: page.getByRole('button', { name: 'Logout' })
        }
    
    }

}
export class AdminRooms {

}

export class AdminReport {
    /* Page object model for the reports admin page would go here to be used in more tests */

}

export class AdminBranding {
    /* Page object model for the branding admin pages would go here to be used in tests */

}

export class AdminMessage {
    /* Page object model for the messages admin pages would go here to be used in tests */
}
