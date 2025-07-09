import * as FrontPage from '../Pages/front_page';
import * as BookingPage from '../Pages/booking_page';
import { test, expect } from '@playwright/test';

test.describe('Booking Page - Single room booking',
    {
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
        const DATE_START_CELL = '13';
        const DATE_END_CELL = '17';
        test.beforeEach('Booking Single Room',
            async ({ page }) => {

                const SINGLE_ROOM = new FrontPage.SingleRooms(page);
                const BOOKING_FORM = new BookingPage.BookingForm(page);
                //use the booking form date selection method here with the start and end date being pulled from the cosnts above.
                const DATE_START = BOOKING_FORM.dateSelection(DATE_START_CELL);
                const DATE_END = BOOKING_FORM.dateSelection(DATE_END_CELL);

                //Navigate to the URL
                await page.goto(FrontPage.BOOKING_URL_STUB);
                //Click on the single room booking
                await SINGLE_ROOM.BOOK.click();


                //Wait for cells to be visible
                await expect(DATE_START).toBeVisible();
                await expect(DATE_END).toBeVisible();

                //Get the position and size of the bounding box
                const START_BOX = await DATE_START.boundingBox();
                const END_BOX = await DATE_END.boundingBox();

                //Make sure the start and end are within the bounding box
                if (START_BOX && END_BOX) {
                    //Start a drag at center of start date cell - in this case 13
                    await page.mouse.move(START_BOX.x + START_BOX.width / 2, START_BOX.y + START_BOX.height / 2);
                    await page.mouse.down();

                    //Move to center of end date cell - in this case 18
                    await page.mouse.move(END_BOX.x + END_BOX.width / 2, END_BOX.y + END_BOX.height / 2, { steps: 10 });
                    //release the mouse click to simulate the drag and drop
                    await page.mouse.up();
                } else {
                    //throw an error if the cell couldn't be located
                    throw new Error('Could not locate one or both dates.');
                }
            }
        );
        //These tests need to come before the final test as if they come after the room would be reserved and these tests would fail.
        test('Incomplete booking', async ({ page }) => {
            const BOOKING_FORM = new BookingPage.BookingForm(page);

            await BOOKING_FORM.RESERVE_NOW.click();
            await BOOKING_FORM.RESERVE_NOW.click();
            await expect(BOOKING_FORM.INVALID_FORM).toBeVisible();
        });

        test('Cancel booking', async ({ page }) => {
            const BOOKING_FORM = new BookingPage.BookingForm(page);

            await BOOKING_FORM.RESERVE_NOW.click();
            await BOOKING_FORM.CANCEL.click();
        });

        const FIRST_NAME = 'Ben';
        const LAST_NAME = 'Waring';
        const EMAIL = 'test@test.com';
        const PHONE = '01234567891';
        test('Complete booking', async ({ page }) => {
            const BOOKING_FORM = new BookingPage.BookingForm(page);

            await BOOKING_FORM.RESERVE_NOW.click();
            await BOOKING_FORM.FIRST_NAME.fill(FIRST_NAME);
            await BOOKING_FORM.LAST_NAME.fill(LAST_NAME);
            await BOOKING_FORM.EMAIL.fill(EMAIL);
            await BOOKING_FORM.PHONE.fill(PHONE);
            await BOOKING_FORM.RESERVE_NOW.click();

        });

        const FIRST_NAME_2 = 'Neb';
        const LAST_NAME_2 = 'Worden';
        const EMAIL_2 = 'test1@test.com';
        const PHONE_2 = '09876543210';
        //This is not the ideal way to check this, as a test.fail will "pass" when it fails, however to highlight that there is an issue here i have set it so that it in fact does fail to flag the defect here.
        test.fail('Check you cannot double book', async ({ page }) => {
            const BOOKING_FORM = new BookingPage.BookingForm(page);

            await BOOKING_FORM.RESERVE_NOW.click();
            await BOOKING_FORM.FIRST_NAME.fill(FIRST_NAME_2);
            await BOOKING_FORM.LAST_NAME.fill(LAST_NAME_2);
            await BOOKING_FORM.EMAIL.fill(EMAIL_2);
            await BOOKING_FORM.PHONE.fill(PHONE_2);
            await BOOKING_FORM.RESERVE_NOW.click();

            //What happens now is the site errors and you get a console error rather than a warning message stating that the room is booked already for those dates.
            //If I had inside information on what was meant to happen here, I would test for it, allow this test to fail so it is visible and then when the fix was commit, this test would pass and we could confirm that this was working as we expect.
            //Because I don't have that information I will instead verify that the error message is occurring.

            await expect(page.getByRole('heading', { name: 'Application error: a client-' })).toBeVisible();

        });

    });
//The tests for double and suite rooms would also continue after this following the same format - one test manually checking that you can change dates, policies etc are as you expect and then reserve the room
//the second suite of tests that check that you are able to just quickly book the room