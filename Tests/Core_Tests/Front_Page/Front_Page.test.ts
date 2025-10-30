import { test, expect } from '../../../fixtures/Core/Front_Page/front_page_fixtures';
import * as FrontPage from '../../../pages/front_page';
import * as TestConst from './TestConst'
import { verifyRoomElements } from '../../../helpers/room_booking';
import { fillAndSubmitContactForm } from '../../../helpers/contact_form';

test.describe('front page sections - availability/booking',
    {
        //tags for the tests mean you can search for specific tests via the tag or in a CI setup, you can run tests via this tag.
        tag: '@Core',
        //This is how i would link to a bugging db like Jira or YouTrack - this would appear in the playwright report as a URL that would take you to the corresponding test case item.
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    },
    () => {

        test('check available dates for rooms', async ({ page, frontPage }) => {
            //pulling through the declared consts from the fixtures page
            const { BOOKINGS, SINGLE_ROOM, CHECK_IN_OPTION, CHECK_OUT_OPTION } = frontPage;

            //loading the bookings page via the URL.
            await page.goto(FrontPage.BOOKING_URL_STUB);

            //select a check-in option
            await BOOKINGS.CHECK_IN.click();
            await CHECK_IN_OPTION.click();
            //select a check-out option
            await BOOKINGS.CHECK_OUT.click();
            await CHECK_OUT_OPTION.click();
            //check which rooms are available
            await BOOKINGS.CHECK_AVAILABILITY.click();
            //this is one where I would turn into a helper function, this function would do the same across any room but you could input the room you wanted from a test Const and the function would check the room and booking button is available.
            await expect(SINGLE_ROOM.HEADING, 'check for a single room to be available').toBeVisible();
            await expect(SINGLE_ROOM.BOOK, 'check that the booking button for that room is visible').toBeVisible();
        });
    }
);


test.describe('front page Sections - room booking functionality',
    {
        tag: '@Core',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    },
    () => {

        test('book a single single room', async ({ page, frontPage }) => {
            //pulling the consts from the fixture page
            const { SINGLE_ROOM } = frontPage;
            //navigate directly via the URL.
            await page.goto(FrontPage.ROOM_URL_STUB);

            //verify the amenities.
            await verifyRoomElements(SINGLE_ROOM);

            //book the room
            await SINGLE_ROOM.BOOK.click();
        });

        test('book a single double room', async ({ page }) => {
            //This would follow the same pattern as the single room test - the POMs haven't been captured for this yet.
        });

        test('book a single suite room', async ({ page }) => {
            //Same pattern for suite rooms - the POMs haven't been captured for this yet.
        });
    }
);


test.describe('front page sections - contact form',
    {
        tag: '@Core',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    },
    () => {

        test('use the contact form - successful submission', async ({ page, frontPage }) => {
            const { CONTACT_FORM } = frontPage;

            await page.goto(FrontPage.CONTACT_URL_STUB);

            //function that will fill in the contact form and click submit.
            await fillAndSubmitContactForm(CONTACT_FORM, {
                NAME: TestConst.FRONT_PAGE.CONTACT_FORM.NAME,
                EMAIL: TestConst.FRONT_PAGE.CONTACT_FORM.EMAIL,
                PHONE: TestConst.FRONT_PAGE.CONTACT_FORM.PHONE_NUMBER,
                SUBJECT: TestConst.FRONT_PAGE.CONTACT_FORM.SUBJECT,
                MESSAGE: TestConst.FRONT_PAGE.CONTACT_FORM.MESSAGE,
            });

        });

        test('sse the contact form - unsuccessful submission', async ({ page, frontPage }) => {
            const { CONTACT_FORM } = frontPage;
            //go directly to the url
            await page.goto(FrontPage.CONTACT_URL_STUB);
            //call the submission function again, this time leave it empty so it just clicks on the submit button.
            await fillAndSubmitContactForm(CONTACT_FORM, { /* This is empty so it will just click the submit button to make sure the unsuccessful submission is working. */ });
            await expect(CONTACT_FORM.FAILED_SUBMISSION, 'failure in submitting the contact form is visible').toBeVisible();
        });
    }
);