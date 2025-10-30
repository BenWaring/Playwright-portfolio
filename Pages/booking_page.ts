//input playwrights variables to use when building the Page Object Models
import { Page, Locator, expect } from '@playwright/test';

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

    /**
     * Returns a locator for a specific date cell on the calendar.
     * @param cellText - The visible text inside the date cell (e.g., "13").
     * @returns A Locator targeting the cell with the given text.
     */
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

    /**
    * Drag across the calendar between two date elements.
    * @param startDate - The locator for the start date cell
    * @param endDate - The locator for the end date cell
    */
    async dragAcrossDates(startDate: Locator, endDate: Locator) {
        //Wait for both cells to be visible
        await expect(startDate).toBeVisible();
        await expect(endDate).toBeVisible();

        //Get bounding boxes for both dates
        const startBox = await startDate.boundingBox();
        const endBox = await endDate.boundingBox();

        if (startBox && endBox) {
            //Move to start cell center and press down
            await this.page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
            await this.page.mouse.down();

            //Drag to end cell center
            await this.page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 10 });

            //Release the mouse
            await this.page.mouse.up();
        } else {
            throw new Error('Could not locate one or both date elements.');
        }
    }

    /**
    * Complete the booking form with given user data.
    * @param details - An object containing user info for booking
    */
    async completeBooking(details: {firstName: string; lastName: string; email: string; phone: string;}) {
        await this.RESERVE_NOW.click();
        await this.FIRST_NAME.fill(details.firstName);
        await this.LAST_NAME.fill(details.lastName);
        await this.EMAIL.fill(details.email);
        await this.PHONE.fill(details.phone);
        await this.RESERVE_NOW.click();
    }
};
