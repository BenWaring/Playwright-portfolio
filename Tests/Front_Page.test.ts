import * as FrontPage from '../Pages/front_page';
import { test, expect } from '@playwright/test';

test.describe('Health Checks - Front Page Sections',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Smoke',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {
        //Basic health check of the page, the usual loading time would be something I would find out from Product/Development after testing and then get a reasonable estimate (in this case 10 seconds) if the site takes longer than that it can indicate an issue.
        //These tests also double down to making sure each section of the site is directly navigatable by the URL
        test('Rooms section',
            async ({ page }) => {

                //Record the start time
                const START = Date.now();
                //Go to the Rooms section of the front page
                await page.goto(FrontPage.ROOM_URL_STUB);
                //Calculate how long the loading of the page has taken
                const DURATION = Date.now() - START;
                //Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
                expect(DURATION).toBeLessThan(10_000);

            }
        );
        test('Bookings section',
            async ({ page }) => {

                //Record the start time
                const START = Date.now();
                //Go to the Bookings section of the front page
                await page.goto(FrontPage.BOOKING_URL_STUB);
                //Calculate how long the loading of the page has taken
                const DURATION = Date.now() - START;
                //Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
                expect(DURATION).toBeLessThan(10_000);


            }
        );
        test('Amenities section',
            async ({ page }) => {

                //Record the start time
                const START = Date.now();
                //Go to the Amenities section of the front page
                await page.goto(FrontPage.AMENITIES_URL_STUB);
                //Calculate how long the loading of the page has taken
                const DURATION = Date.now() - START;
                //Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
                expect(DURATION).toBeLessThan(10_000);


            }
        );
        test('Locations section',
            async ({ page }) => {

                //Record the start time
                const START = Date.now();
                //Go to the Locations section of the front page
                await page.goto(FrontPage.LOCATION_URL_STUB);
                //Calculate how long the loading of the page has taken
                const DURATION = Date.now() - START;
                //Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
                expect(DURATION).toBeLessThan(10_000);


            }
        );
        test('Contact section',
            async ({ page }) => {

                //Record the start time
                const START = Date.now();
                //Go to the Contact section of the front page
                await page.goto(FrontPage.CONTACT_URL_STUB);
                //Calculate how long the loading of the page has taken
                const DURATION = Date.now() - START;
                //Check that the page has loaded in less than 10 seconds - if it took longer the test would fail
                expect(DURATION).toBeLessThan(10_000);


            }
        );
    }
);
test.describe('Front Page Sections - Availability/Booking',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Core',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {

        const CHECKIN_DATE = 'Friday, 25 July'
        const CHECKOUT_DATE = 'Friday, 1 August'
        test('Check available dates',
            async ({ page }) => {

                //declare the variables used
                const BOOKINGS = new FrontPage.Bookings(page);
                const SINGLE_ROOM = new FrontPage.SingleRooms(page);
                const CHECK_IN_OPTION = BOOKINGS.getDateOption(page, CHECKIN_DATE);
                const CHECK_OUT_OPTION = BOOKINGS.getDateOption(page, CHECKOUT_DATE);

                //go to the direct section of the page
                await page.goto(FrontPage.BOOKING_URL_STUB);

                //Click on the Check in date
                await BOOKINGS.CHECK_IN.click();
                await CHECK_IN_OPTION.click();

                //Click on the check out date
                await BOOKINGS.CHECK_OUT.click();
                await CHECK_OUT_OPTION.click();

                //Check availability
                await BOOKINGS.CHECK_AVAILABILITY.click();

                //Verify the single room is available for booking
                await expect(SINGLE_ROOM.HEADING).toBeVisible();
                await expect(SINGLE_ROOM.BOOK).toBeVisible();

            }
        );
    });

test.describe('Front Page Sections - Rooms',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Core',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {

        test('Book a Single room',
            async ({ page }) => {

                //Declare the variables needed
                const SINGLE_ROOM = new FrontPage.SingleRooms(page);
                //Go to the Rooms section of the front page
                await page.goto(FrontPage.ROOM_URL_STUB);
             
                //Check that the single room is setup as expected
                //I am aware that in the admin section of the site this is configurable - however in most cases the setup would be one track rather than configurable unless you were operating as SaaS where a client can configure the software
                //This would be best practice for this section of the page especially as a core test - if the users could not book rooms the entire site would not be worthwhile.
                await expect(SINGLE_ROOM.HEADING).toBeVisible();
                await expect(SINGLE_ROOM.TV).toBeVisible();
                await expect(SINGLE_ROOM.WIFI).toBeVisible();
                await expect(SINGLE_ROOM.SAFE).toBeVisible();
                await expect(SINGLE_ROOM.PRICE).toBeVisible();
                await expect(SINGLE_ROOM.BOOK).toBeVisible();

                //Click the Book button
                await SINGLE_ROOM.BOOK.click();

            }
        );
        test('Book a Double room',
            async ({ page }) => {

                //This test would match the one above with locators for the double room

            }
        );
        test('Book a Suite room',
            async ({ page }) => {

                //same here for the suite rooms

            }
        );
});
test.describe('Front Page Sections - Contact form',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Core',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {

        //Some things I could do here to improve the usability of this - I could turn this into it's own function like I did for the "login"
        //For sensitive data - I could also use environment variables, in this instance I think this would be overkill here.

        //Again handle the variables here outside of the tests, this way there is less information within the tests to manage and if I want to use this contact form 4 or 5 times, I can re-use these variables.
        const NAME = 'Core test - Contact form'
        //If we could check the recieving of emails this could be setup as going to a test inbox for this, we could also add checks to make sure emails are recieved
        const EMAIL = 'Test@test.com'
        const PHONE_NUMBER = '01234567891'
        const SUBJECT = 'Tests'
        const MESSAGE = 'This is a test message'

        test('Use the contact form - Successful Submission',
            async ({ page }) => {

                const CONTACT_FORM = new FrontPage.Contact(page);

                //Go to the Contact section of the front page
                await page.goto(FrontPage.CONTACT_URL_STUB);

                //Add the name to the form
                await CONTACT_FORM.NAME.fill(NAME);
                //Add the email to the form
                await CONTACT_FORM.EMAIL.fill(EMAIL);
                //Add the phone number
                await CONTACT_FORM.PHONE.fill(PHONE_NUMBER);
                //Add the subject
                await CONTACT_FORM.SUBJECT.fill(SUBJECT);
                //add the message
                await CONTACT_FORM.MESSAGE.fill(MESSAGE);
                //click submit
                await CONTACT_FORM.SUBMIT.click();

                //Verify the submission has gone through
                await expect(CONTACT_FORM.SUCESSFUL_SUBMISSION).toBeVisible();

            }
        );
        //There are a couple way of doing an unsuccessful check here
        //One way would be to leave out each of the different fields, check the unsuccessful is coming up for each of those - this would be part of you expanded tests over core tests however and could be seen as overkill.
        //The way I am doing it will be to not fill in any section, just hit submit and check that the red validation issue box appears with the messages inside.
        //Depending on my timeframe I would build a general catch all test for this - then log test suites to get each validation message checked in later sprints when the workload is lighter.
        test('Use the contact form - Unsuccessful Submission',
            async ({ page }) => {

                const CONTACT_FORM = new FrontPage.Contact(page);

                //Go to the Contact section of the front page
                await page.goto(FrontPage.CONTACT_URL_STUB);

                //click submit
                await CONTACT_FORM.SUBMIT.click();

                //check the validation has flagged
                await expect(CONTACT_FORM.FAILED_SUBMISSION).toBeVisible();

            }
        );
});