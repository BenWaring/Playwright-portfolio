import { test, expect } from '../../../fixtures/Core/Booking_Page/booking_page_fixtures';
import * as FrontPage from '../../../pages/front_page';
import * as TestConst from './TestConst';

test.describe('booking page - single room booking', {
    //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
    tag: '@Core',
    annotation: {
        type: 'Bugging DB',
        description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
    },
}, () => {
    //setting this test as a beforeEach, this means the booking page is setup for specific dates that I want to check
    //This is really useful if you want to check just the booking functionality as well as objects on the page - for example the policies for the room
    //There would also need to be in this suite of tests manually changing the days and checking that booking works as well.
    test.beforeEach(async ({ page, singleRoom, bookingForm, dateStart, dateEnd }) => {
        await page.goto(FrontPage.BOOKING_URL_STUB);
        await singleRoom.BOOK.click();
        await bookingForm.dragAcrossDates(dateStart, dateEnd);
    });
    //These tests need to come before the final test as if they come after the room would be reserved and these tests would fail.
    test('Incomplete booking', async ({ bookingForm }) => {
        await bookingForm.RESERVE_NOW.click();
        await bookingForm.RESERVE_NOW.click();
        await expect(bookingForm.INVALID_FORM, 'check that the booking form is invalid').toBeVisible();
    });

    test('Cancel booking', async ({ bookingForm }) => {
        await bookingForm.RESERVE_NOW.click();
        await bookingForm.CANCEL.click();
    });

    test('Complete booking', async ({ bookingForm }) => {
        await bookingForm.completeBooking({
            firstName: TestConst.BOOKING_PAGE.COMPLETE_BOOKING.FIRST_NAME,
            lastName: TestConst.BOOKING_PAGE.COMPLETE_BOOKING.LAST_NAME,
            email: TestConst.BOOKING_PAGE.COMPLETE_BOOKING.EMAIL,
            phone: TestConst.BOOKING_PAGE.COMPLETE_BOOKING.PHONE,
        });
    });

    test.fixme('Check you cannot double book', async ({ page, bookingForm }) => {
        await bookingForm.completeBooking({
            firstName: TestConst.BOOKING_PAGE.DOUBLE_BOOKING.FIRST_NAME,
            lastName: TestConst.BOOKING_PAGE.DOUBLE_BOOKING.LAST_NAME,
            email: TestConst.BOOKING_PAGE.DOUBLE_BOOKING.EMAIL,
            phone: TestConst.BOOKING_PAGE.DOUBLE_BOOKING.PHONE,
        });
        //What happens now is the site errors and you get a console error rather than a warning message stating that the room is booked already for those dates.
        //If I had inside information on what was meant to happen here, I would test for it, allow this test to fail so it is visible and then when the fix was commit, this test would pass and we could confirm that this was working as we expect.
        //Because I don't have that information I will instead verify that the error message is occurring.
        await expect(page.getByRole('heading', { name: 'Application error: a client-' })).toBeVisible();
    });

});
//The tests for double and suite rooms would also continue after this following the same format - one test manually checking that you can change dates, policies etc are as you expect and then reserve the room
//the second suite of tests that check that you are able to just quickly book the room