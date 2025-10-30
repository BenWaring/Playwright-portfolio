import { test as base } from '@playwright/test';
import * as FrontPage from '../../../pages/front_page';
import * as BookingPage from '../../../pages/booking_page';
import * as TestConst from '../../../Tests/Core_Tests/Booking/TestConst';

type BookingFixtures = {
  singleRoom: FrontPage.SingleRooms;
  bookingForm: BookingPage.BookingForm;
  dateStart: ReturnType<BookingPage.BookingForm['dateSelection']>;
  dateEnd: ReturnType<BookingPage.BookingForm['dateSelection']>;
};

export const test = base.extend<BookingFixtures>({
  singleRoom: async ({ page }, use) => {
    await use(new FrontPage.SingleRooms(page));
  },

  bookingForm: async ({ page }, use) => {
    await use(new BookingPage.BookingForm(page));
  },

  dateStart: async ({ bookingForm }, use) => {
    await use(bookingForm.dateSelection(TestConst.BOOKING_PAGE.ROOM_BOOKING.DATE_START_CELL));
  },

  dateEnd: async ({ bookingForm }, use) => {
    await use(bookingForm.dateSelection(TestConst.BOOKING_PAGE.ROOM_BOOKING.DATE_END_CELL));
  },
});

export const expect = base.expect;