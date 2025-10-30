import { expect, Locator } from '@playwright/test';

/**
 * Generic helper to verify visibility of one or more locators in a Page Object (e.g., SINGLE_ROOM).
 * 
 * This function loops through a list of expected element keys (e.g., 'HEADING', 'BOOK'),
 * checks that each one exists and behaves,
 * and then checks visibility for each.
 * 
 * The function is flexible enough to work with any Page Object that has Locator-like properties.
 */
export async function verifyRoomElements<T extends Record<string, any>>( room: T, elements: (keyof T)[] = ['HEADING', 'TV', 'WIFI', 'SAFE', 'PRICE', 'BOOK'] as (keyof T)[]): Promise<void> {
   
    //Loop through each key in the provided element list - defaults to all but can be specified to specific elements.
    for (const KEY of elements) {
    //Grab the locator from the room object
    const LOCATOR = room[KEY];
    //Check that the locator exists and looks like a Playwright Locator
    if (LOCATOR && typeof (LOCATOR as any).isVisible === 'function') {
      await expect(LOCATOR as Locator, 'checking that the element is visible on the page.').toBeVisible();
    } else {
      //If the room element doesn't exist or isn't a valid Locator, log a console error.
      console.error(`Element "${String(KEY)}" not found or is not a valid Locator`);
    }
  }
}