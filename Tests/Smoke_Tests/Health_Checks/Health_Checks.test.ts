import { test} from '@playwright/test';
import { checkSectionLoadTime } from '../../../helpers/loadTime';
import { SECTIONS } from './TestConst'

test.describe('health checks - all pages.', {
    //tagged as smoke so this can be run as a group or run in a CI environment via the tag.
    tag: '@Smoke',
    annotation: {
        type: 'Bugging DB',
        description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
    },
}, () => {
    //for each URL that I am passing into the function it is loading that part of the system and doing the system health checks.
    for (const { NAME, URL } of SECTIONS) {
        test(`${NAME} section loads within 10 seconds`, async ({ page }) => {
            await checkSectionLoadTime(page, NAME, URL);
        });
    }

});