//input playwrights variables to use when building the Page Object Models
import { Page, Locator } from '@playwright/test';

export class BookingForm {
    //Declare the variables
    private readonly page: Page;
    readonly FIRST_NAME: Locator;
    readonly LAST_NAME: Locator;
    readonly EMAIL: Locator;
    readonly PHONE: Locator;
    readonly RESERVE_NOW: Locator;
    readonly CANCEL: Locator;
    //After invalid form
    readonly INVALID_FORM: Locator;


    dateSelection(cellText: string): Locator {
        return this.page.getByRole('cell', { name: cellText });
    }

    //build the loctors
    constructor(page: Page) {

        this.page = page;

        this.FIRST_NAME = page.getByLabel('FirstName');
        this.LAST_NAME = page.getByLabel('LastName');
        this.EMAIL = page.getByLabel('Email');
        this.PHONE = page.getByLabel('Phone');
        this.RESERVE_NOW = page.getByRole('button', { name: 'Reserve Now' });
        this.CANCEL = page.getByRole('button', { name: 'Cancel' });
        //after an invalid form
        this.INVALID_FORM = page.getByRole('alert').first();

    }
}
