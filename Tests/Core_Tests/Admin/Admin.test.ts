import * as AdminPage from '../../../pages/admin_page';
import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('room creation checks',
	{
		//Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
		tag: '@Core',
		annotation: {
			type: 'Bugging DB',
			description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
		},
	}, () => {
		
		test.beforeAll('create a room',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

				//Create a new room
			
			}
		);
		test('verify Room is created in admin section',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

				//Verify a new room was created
			
			}
		);
		test.afterAll('delete the newly created room',
			async ({ page }) => {

				//Login to the Admin section
				await AdminPage.login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);

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