import { expect, Locator } from '@playwright/test';

interface ContactForm {
  NAME: Locator;
  EMAIL: Locator;
  PHONE: Locator;
  SUBJECT: Locator;
  MESSAGE: Locator;
  SUBMIT: Locator;
}

/**
 * Fills the contact form with given data and optionally submits it.
 *
 * - If fields are provided, it fills them.
 * - If no fields are provided, it just clicks the Submit button.
 *
 * @param contactForm - The contact form page object.
 * @param data - Optional fields to fill (NAME, EMAIL, etc.).
 * @param clickSubmit - Whether to click the Submit button (defaults to true).
 */
export async function fillAndSubmitContactForm(
  contactForm: ContactForm,
  data: Partial<Record<keyof ContactForm, string>> = {},
  clickSubmit: boolean = true
): Promise<void> {
  const FIELD_KEYS = Object.keys(data) as (keyof ContactForm)[];

  //If data was provided, fill those fields
  if (FIELD_KEYS.length > 0) {
    for (const KEY of FIELD_KEYS) {
      const LOCATOR = contactForm[KEY];
      const VALUE = data[KEY];
      if (LOCATOR && typeof VALUE === 'string') {
        await LOCATOR.fill(VALUE);
      }
    }
  }

  //If clickSubmit is true, or if no data was provided at all, click Submit
  if (clickSubmit || FIELD_KEYS.length === 0) {
    await contactForm.SUBMIT.click();
  }
}