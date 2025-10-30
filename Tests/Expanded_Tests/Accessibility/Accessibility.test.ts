import { test, expect } from '@playwright/test';
import { runAxeCheck, saveViolations } from '../../../helpers/accessibility';
import { PAGES_TO_TEST } from './TestConst'; //import TestConst array

test.describe('Accessibility Checks', { tag: '@Expanded' }, () => {
    for (const PAGE_INFO of PAGES_TO_TEST) {
        //This will loop through the array found in the TestConst
        //This will test the accessibility of those pages from the array without needing to have multiple tests doing the same thing.
        test(`Accessibility of ${PAGE_INFO.name}`, async ({ page }) => {
            await page.goto(PAGE_INFO.url);

            const RESULTS = await runAxeCheck(page);
            saveViolations(page, RESULTS);

            expect(
                RESULTS.violations.length,
                `Accessibility violations found on ${PAGE_INFO.name}: ${RESULTS.violations.length}`
            ).toBe(0);
        });
    }
});