import * as AdminPage from '../Pages/admin_page';
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Health Check - Admin Page',
	{
		//Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
		tag: '@Smoke',
		annotation: {
			type: 'Bugging DB',
			description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
		},
	}, () => {
		//Basic health check of the page, the usual loading time would be something I would find out from Product/Development after testing and then get a reasonable estimate (in this case 10 seconds) if the site takes longer than that it can indicate an issue.
		test('Admin Page Loads - under 10 seconds',
			async ({ page }) => {

				//Record the start time
				const START = Date.now();
				//Goes directly to the Admin page for the site - URL is dictated within the playwright.config.ts for the purposes of this demo.
				await page.goto(AdminPage.URL_STUB);
				//Calculate how long the loading of the page has taken
				const DURATION = Date.now() - START;
				//Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
				expect(DURATION).toBeLessThan(10_000);
			}
		);
	}
);

test.describe('Login Checks',
	{
		//Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
		tag: '@Smoke',
		annotation: {
			type: 'Bugging DB',
			description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
		},
	}, () => {
		test('Manual Correct Login',
			async ({ page }) => {

				const LOGIN_PAGE = new AdminPage.Login(page);
				const AFTER_LOGIN = new AdminPage.AdminUpperToolbarAfterLogin(page);

				//Go to the Admin page
				await page.goto(AdminPage.URL_STUB);

				//Enter username
				await LOGIN_PAGE.USER_NAME.fill(process.env.ADMIN_USERNAME!);
				//Enter password
				await LOGIN_PAGE.PASSWORD.fill(process.env.ADMIN_PASSWORD!);
				//Click Login
				await LOGIN_PAGE.LOGIN.click();
				//Verify the Admin screen is visible here (without it the login might be failing without verification)
				await expect(AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.ROOMS).toBeVisible();

			}
		);

		//setting the const outside the test itself means I can setup 4 or 5 different tests to all login using these same fake credentials - in this istance it would be irrelevant.
		//In a more complex website, one where you wish to test multiple users inputting the same information at once, it makes managing that information easier as you manage it in the variables rather than the tests themselves.
		const INCORRECT_USERNAME = 'Test';
		const INCORRECT_PASSWORD = 'Test';
		test('Manual Incorrect Login',
			async ({ page }) => {

				const LOGIN_PAGE = new AdminPage.Login(page);

				//Go to the Admin page
				await page.goto(AdminPage.URL_STUB);

				//Enter username
				await LOGIN_PAGE.USER_NAME.fill(INCORRECT_USERNAME);
				//Enter password
				await LOGIN_PAGE.PASSWORD.fill(INCORRECT_PASSWORD);
				//Click Login
				await LOGIN_PAGE.LOGIN.click();
				//Verify the invalid credentials button - this appears after an incorrect login
				await expect(LOGIN_PAGE.INVALID_LOGIN).toBeVisible();
			}
		);

		test('Logout works as intended',
			async ({ page }) => {

				const AFTER_LOGIN = new AdminPage.AdminUpperToolbarAfterLogin(page);

				//Call the function to log in
				await AdminPage.login(page);
				//Click the logout button
				await AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.LOGOUT.click();

			}
		);
		/*
		You could have this test as an afterAll, where you trim out the login function, this way you always make sure that after the test suite has ran, the users are logged out.
		In this capacity for this demo site however, this was never a problem - this however would be best practice in a suite of tests where the login is held onto.
		If you wanted a different login per test you could convert this to an afterEach so each new test could use a different login.
		test.afterAll('Logout works as intended',
			async ({ page }) => {

				const AFTER_LOGIN = new AdminPage.AdminUpperToolbarAfterLogin(page);

				//Click the logout button
				await AFTER_LOGIN.UPPERTOOLBAR_AFTERLOGIN.LOGOUT.click();

			}
		);
		*/
	}
);
test.describe('Admin Room checks',
	{
		//Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
		tag: '@Core',
		annotation: {
			type: 'Bugging DB',
			description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
		},
	}, () => {
		
		test('Create Room',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page);

				//Create a new room
			
			}
		);
		test('Verify Room is created in Admin section',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page);

				//Verify a new room was created
			
			}
		);
		test.afterAll('Delete the newly created room',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page);

				//Delete the newly created room
				//This deletion would reset the site back to the initial state, this makes it less likely for tests to cross over and trip each other up.
			
			}
		);
	}
);
/*
The suite would continue like this checking each section when logged in as Admin.
This section of the suite would be broken down from Smoke to Core to Extended tests depending on area or importance
The admin section of the site is hidden but the backend functionality is vital to the site working - if the Admin section doesn't work then you cannot reliably make sure bookings etc are working
*/