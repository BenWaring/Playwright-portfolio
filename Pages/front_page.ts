//input playwrights variables to use when building the Page Object Models
import { Page, Locator } from '@playwright/test';

//URL stub which can be used for direct navigation - will help with health checks as well as testing in the general area without needing constant navigation
export const ROOM_URL_STUB = '/#rooms';
export const BOOKING_URL_STUB = '/#booking';
export const AMENITIES_URL_STUB = '/#amenities';
export const LOCATION_URL_STUB = '/#location';
export const CONTACT_URL_STUB = '/#contact';

//Class for the Upper Toolbar section of the page
export class UpperToolbar {

    //Declare variables to use
    readonly UPPER_LEFT_RETURN: Locator;
    readonly ROOMS: Locator;
    readonly BOOKING: Locator;
    readonly AMENITIES: Locator;
    readonly LOCATION: Locator;
    readonly CONTACT: Locator;
    readonly ADMIN: Locator;
    
    //Build the locators used
    constructor(page: Page) {

        this.UPPER_LEFT_RETURN = page.getByRole('link', { name: 'Shady Meadows B&B' });
        this.ROOMS = page.locator('#navbarNav').getByRole('link', { name: 'Rooms' });
        this.BOOKING = page.locator('#navbarNav').getByRole('link', { name: 'Booking' });
        this.AMENITIES = page.getByRole('link', { name: 'Amenities' });
        this.LOCATION = page.getByRole('link', { name: 'Location' });
        this.CONTACT = page.locator('#navbarNav').getByRole('link', { name: 'Contact' });
        this.ADMIN = page.getByRole('link', { name: 'Admin', exact: true });
    
    }
}

export class Bookings {

    //Declare variables to use
    readonly CHECK_IN : Locator;
    readonly CHECK_OUT : Locator;
    readonly CHECK_AVAILABILITY : Locator;
    //After clicking on either check-in or check out
    readonly DATE_SELECT: Locator;
    //Choosing the date method
    getDateOption(page: Page, dateLabel: string): Locator {
        return page.getByRole('option', { name: `Choose ${dateLabel}` });
    }

    //Build the locators used
    constructor(page: Page) {
    
        this.CHECK_IN = page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox');
        this.CHECK_OUT = page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox');
        this.CHECK_AVAILABILITY = page.getByRole('button', { name: 'Check Availability' });
        this.DATE_SELECT = page.getByLabel('Choose Date').locator('div').first();

    }
}

export class SingleRooms {

    //Declare variables to use
    readonly HEADING: Locator;
    //I would usually capture the description but there is nothing reliable to anchor off that would make sense
    //Since this is using Lorem ipsum and is placeholder I have chosen to leave it out for now.
    readonly TV: Locator;
    readonly WIFI: Locator;
    readonly SAFE: Locator;
    readonly PRICE: Locator;
    readonly BOOK: Locator;
 
    //Build the locators used
    constructor(page: Page) {
        this.HEADING = page.getByRole('heading', { name: 'Single' });
        this.TV = page.getByText('TV').first();
        this.WIFI = page.getByText('WiFi').first();
        this.SAFE = page.getByText('Safe').first();
        this.PRICE = page.getByText('£100 per night');
        this.BOOK = page.locator('div').filter({ hasText: /^£100 per nightBook now$/ }).getByRole('link');
    
    }
}

//To note, this entire section of the site, whilst it is worth while the checks around it would be very low priority as this information is now public knowledge (i.e it could be found on google maps)
//therefore this class could be left until last and be setup for use during the Expanded round of tests.
export class Location {

    //Declare variables to use
 
    //Build the locators used
    constructor(page: Page) {
    
    }
}

export class Contact {

    //Declare variables to use
    readonly NAME: Locator;
    readonly EMAIL: Locator;
    readonly PHONE: Locator;
    readonly SUBJECT: Locator;
    readonly MESSAGE: Locator;
    readonly SUBMIT: Locator;

    //After a successful submission
    readonly SUCESSFUL_SUBMISSION: Locator;
    //After a fail submission
    readonly FAILED_SUBMISSION: Locator;
    //Specific failed - proof of concept on how it would work split out further
    //readonly FAILED_PHONE: Locator;
 
    //Build the locators used
    constructor(page: Page) {

        //TEST ID's - this is how ideally every site would be setup, every section of the site would have a data-testID which would make building POMs easier and more reliable.
        this.NAME = page.getByTestId('ContactName');
        this.EMAIL = page.getByTestId('ContactEmail');
        this.PHONE = page.getByTestId('ContactPhone');
        this.SUBJECT = page.getByTestId('ContactSubject');
        this.MESSAGE = page.getByTestId('ContactDescription');
        this.SUBMIT = page.getByRole('button', { name: 'Submit' });

        //After successful submission
        this.SUCESSFUL_SUBMISSION = page.getByText('Thanks for getting in touch');

        //After failed submission - anchored this off of the class for now
        //If this were to be split out you could first anchor it off the class then off the text you expect:
        //this.FAILED_PHONE = page.locator('.alert').getByText('Phone may not be blank');
        //this is a proof of concept on how you could expand the tests for this section specifically.
        this.FAILED_SUBMISSION = page.locator('.alert');

    }
}