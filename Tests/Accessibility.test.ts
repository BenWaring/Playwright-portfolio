import { test, expect } from '@playwright/test';
import { injectAxe } from 'axe-playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import * as FrontPage from '../Pages/front_page';
import * as AdminPage from '../Pages/admin_page';

//Simple accessibility checks using axe-playwright - installed in the terminal using: npm install axe-playwright @axe-core/playwright
//This will output violations from the WCAG - which is when a website doesn't meet the accessibility standards outlined in the WCAG
//This will export the accessibility issues into a JSON file, this will be order by severity - however this is an expanded test and I would image alot of these issues would turn into low priority defects anyway but it gives you a solid foundation to work on accessibility of pages.
test.describe('Accessible Checks',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Expanded',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {

        test('Accessibility of the Rooms Page', async ({ page }) => {
            //Set up test folder
            const folder = 'test-results/accessibility-issues';
            if (!existsSync(folder)) mkdirSync(folder, { recursive: true });

            //Go to the rooms page
            await page.goto(FrontPage.ROOM_URL_STUB);

            //axe executable commands in the current window
            await injectAxe(page);

            //Run axe and capture results
            const results = await page.evaluate(async () => {
                return await (window as any).axe.run();
            });

            //Define the severity to help with sorting 
            const severityOrder = ['critical', 'serious', 'moderate', 'minor'];

            //Sort violations by severity
            results.violations.sort((a, b) => {
                const aScore = severityOrder.indexOf(a.impact ?? 'minor');
                const bScore = severityOrder.indexOf(b.impact ?? 'minor');
                return aScore - bScore;
            });

            //get filename from URL path
            const pathName = new URL(page.url()).pathname.replace(/\W+/g, ' ').trim();
            const fileName = pathName
                ? `${pathName} accessibility.json`
                : 'rooms page accessibility.json';
            const filePath = path.join(folder, fileName.toLowerCase());

            //Save sorted violations only
            const exportData = {
                url: page.url(),
                totalViolations: results.violations.length,
                groupedByImpact: results.violations.reduce((acc, v) => {
                    const severity = v.impact || 'minor';
                    acc[severity] = acc[severity] || [];
                    acc[severity].push(v);
                    return acc;
                }, {} as Record<string, typeof results.violations>)
            };

            writeFileSync(filePath, JSON.stringify(exportData, null, 2));

            //Fail the test if violations were found
            expect(results.violations.length, `Accessibility violations found: ${results.violations.length}`).toBe(0);
        });
    });
/*
 * You could then repeat this for each page you want to check
 * You could also start building to check for specific accessibility issues - for example you could build a test that checks that each of the objects on the page has a unique key identifying it
 * You could take this a bit further with specific UI checks as well - making sure that the "Book" buttons are the correct hue of blue or that the images on the page are as you expect, have the correct filepath and file name and then screenshot compare them
 * These would all be expanded tests and less about functionality and more about if the page looks how we want.
 */