import * as FrontPage from '../../../pages/front_page';
import * as AdminPage from '../../../pages/admin_page';

export const PERFORMANCE_PAGES = [
    { url: FrontPage.ROOM_URL_STUB, name: 'Rooms Page' },
    { url: FrontPage.CONTACT_URL_STUB, name: 'Contact Page' },
    { url: FrontPage.BOOKING_URL_STUB, name: 'Bookings Page' },
    { url: FrontPage.AMENITIES_URL_STUB, name: 'Amenities Page' },
    { url: FrontPage.LOCATION_URL_STUB, name: 'Location Page' },
    { url: AdminPage.URL_STUB, name: 'Admin Page' },
];

export const PERFORMANCE_METRICS = {
    THRESHOLD: 3000,
    DOM_INTERACTIVE_LIMIT: 2000,
    TTFB_LIMIT: 500,
}