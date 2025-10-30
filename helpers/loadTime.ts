import { expect, Page } from '@playwright/test';

/**
 * Checks that a section of the front page loads within a reasonable time.
 *
 * @param page - Page object
 * @param sectionName - Friendly name for the section (for logging)
 * @param url - The URL to test
 * @param maxLoadMs - Maximum allowed load time in milliseconds (default: 10s)
 */
export async function checkSectionLoadTime(
    page: Page,
    sectionName: string,
    url: string,
    maxLoadMs = 10_000
): Promise<void> {
    const START = Date.now();
    await page.goto(url);
    const DURATION = Date.now() - START;

    console.log(`${sectionName} section loaded in ${DURATION} ms`);

    expect(DURATION, `${sectionName} took too long to load (${DURATION}ms > ${maxLoadMs}ms)`).toBeLessThan(maxLoadMs);
}