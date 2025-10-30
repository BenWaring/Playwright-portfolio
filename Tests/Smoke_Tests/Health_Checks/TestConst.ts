import * as FrontPage from '../../../pages/front_page';
import * as AdminPage from '../../../pages/admin_page';

//If pages are added, changed etc. They can be added or removed from here without affecting the running code.
//If URLs change, you can go up a level into the POMs and change the URLs there without affecting the bulk of the code.
export const SECTIONS = [
    { NAME: 'Rooms', URL: FrontPage.ROOM_URL_STUB },
    { NAME: 'Bookings', URL: FrontPage.BOOKING_URL_STUB },
    { NAME: 'Amenities', URL: FrontPage.AMENITIES_URL_STUB },
    { NAME: 'Locations', URL: FrontPage.LOCATION_URL_STUB },
    { NAME: 'Contact', URL: FrontPage.CONTACT_URL_STUB },
    { NAME : 'Admin', URL: AdminPage.URL_STUB },
];