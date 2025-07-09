import { test, expect } from '@playwright/test';
import * as FrontPage from '../Pages/front_page';
import * as AdminPage from '../Pages/admin_page';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

//How the JSON file will be laid out
interface PerformanceMetrics {
    loadTime: number;
    domInteractive: number;
    ttfb: number;
    url: string;
    timestamp: string;
}

//These are basic performance checks - I would prefer this to be more indepth using JMeter or K6 but you could also configure this to flag issues depending on the performance metrics
//The performance checks here will output the metrics to a JSON file, in the test-results folder (some may already exist you can delete those if you wish). This is useful for tracking performance over time and if there are issues, you can see when this began.
test.describe('Performance Checks',
    {
        //Searchable tag, also would allow the tests to be broken down when being run in a CI environment - example you could run the smoke tests as one suite despite them being across various folders.
        tag: '@Smoke',
        annotation: {
            type: 'Bugging DB',
            description: 'Link to Bugging DB to track AutoUI Test Case/Suite',
        },
    }, () => {

        //An expected performance load time, DOM Interactive limit and TTFB Limit, this would acquired from Development/Production/Product owners on how long the site SHOULD take to load and work correctly.
        //You could break this down into variables for each page or use a generic benchmark like I have done here
        //Expected performance of pages
        const THRESHOLD = 3000;
        //Document Object Model - this specifically is measuring when the page becomes usable and ready for interaction.
        const DOM_INTERACTIVE_LIMIT = 2000;
        //Time to first byte limit - which we use for measuring how long it takes from sending the request to receiving the first repsonse from the server
        const TTFB_LIMIT = 500;

        test('Performance - Rooms Page', async ({ page }) => {
            //Variables for the folder and file I want to use - in this case a performance.json file
            const folder = 'test-results';
            const filePath = path.join(folder, 'Rooms - performance.json');

            //if the folder already exists - create the folder
            if (!existsSync(folder)) mkdirSync(folder);

            //go to the URL I want to check performance against
            await page.goto(FrontPage.ROOM_URL_STUB);

            //Evaluate the performance of the page and output that to JSON
            const navTiming = await page.evaluate(() => {
                return performance.getEntriesByType('navigation')[0].toJSON();
            });

            //create the variables for the performance metrics, this could be output as a console, but tracking the performance in a JSON file would be better
            //This would give us accurate accounts of the pages across days, so if in 9 days performance got worse, we could see when that started happening, compare that to a developer commit and work out the cause.
            const newEntry: PerformanceMetrics = {
                loadTime: navTiming.loadEventEnd,
                domInteractive: navTiming.domInteractive,
                ttfb: navTiming.responseStart - navTiming.requestStart,
                url: page.url(),
                timestamp: new Date().toISOString()
            };

            let data: PerformanceMetrics[] = [];

            //If the file already exists, make sure you add to it, not overwrite the file
            if (existsSync(filePath)) {
                const raw = readFileSync(filePath, 'utf-8');
                try {
                    data = JSON.parse(raw);
                } catch {
                    //warn the user that the file is being overwritten
                    console.warn('Invalid JSON in existing file. Overwriting.');
                }
            }

            //Push all the metrics from the test into the file
            data.push(newEntry);
            writeFileSync(filePath, JSON.stringify(data, null, 2));

            //Expect the loadtimes to be within the limits we have set outside the test - if they exceed this, the test should fail.
            expect(newEntry.loadTime).toBeLessThanOrEqual(THRESHOLD);
            expect(newEntry.domInteractive).toBeLessThanOrEqual(DOM_INTERACTIVE_LIMIT);
            expect(newEntry.ttfb).toBeLessThanOrEqual(TTFB_LIMIT);
        });

        test('Performance Admin Page',
            async ({ page }) => {

                //Variables for the folder and file I want to use - in this case a performance.json file
                const folder = 'test-results';
                const filePath = path.join(folder, 'Admin - performance.json');

                //if the folder already exists - create the folder
                if (!existsSync(folder)) mkdirSync(folder);

                //Navigate to the URL
                await page.goto(AdminPage.URL_STUB);

                //Evaluate the performance of the page and output that to JSON
                const navTiming = await page.evaluate(() => {
                    return performance.getEntriesByType('navigation')[0].toJSON();
                });

                //create the variables for the performance metrics, this could be output as a console, but tracking the performance in a JSON file would be better
                //This would give us accurate accounts of the pages across days, so if in 9 days performance got worse, we could see when that started happening, compare that to a developer commit and work out the cause.
                const newEntry: PerformanceMetrics = {
                    loadTime: navTiming.loadEventEnd,
                    domInteractive: navTiming.domInteractive,
                    ttfb: navTiming.responseStart - navTiming.requestStart,
                    url: page.url(),
                    timestamp: new Date().toISOString()
                };

                let data: PerformanceMetrics[] = [];

                //If the file already exists, make sure you add to it, not overwrite the file
                if (existsSync(filePath)) {
                    const raw = readFileSync(filePath, 'utf-8');
                    try {
                        data = JSON.parse(raw);
                    } catch {
                        //warn the user that the file is being overwritten
                        console.warn('Invalid JSON in existing file. Overwriting.');
                    }
                }

                //Push all the metrics from the test into the file
                data.push(newEntry);
                writeFileSync(filePath, JSON.stringify(data, null, 2));

                //Expect the loadtimes to be within the limits we have set outside the test - if they exceed this, the test should fail.
                expect(newEntry.loadTime).toBeLessThanOrEqual(THRESHOLD);
                expect(newEntry.domInteractive).toBeLessThanOrEqual(DOM_INTERACTIVE_LIMIT);
                expect(newEntry.ttfb).toBeLessThanOrEqual(TTFB_LIMIT);

            }
        );
        test('Performance Bookings Page',
            async ({ page }) => {

                const SINGLE_ROOM = new FrontPage.SingleRooms(page);
                //Variables for the folder and file I want to use - in this case a performance.json file
                const folder = 'test-results';
                const filePath = path.join(folder, 'Bookings - performance.json');

                //if the folder already exists - create the folder
                if (!existsSync(folder)) mkdirSync(folder);

                //Navigate to the URL
                await page.goto(FrontPage.ROOM_URL_STUB);
                //Click on the single room booking
                await SINGLE_ROOM.BOOK.first().click();

                //Evaluate the performance of the page and output that to JSON
                const navTiming = await page.evaluate(() => {
                    return performance.getEntriesByType('navigation')[0].toJSON();
                });

                //create the variables for the performance metrics, this could be output as a console, but tracking the performance in a JSON file would be better
                //This would give us accurate accounts of the pages across days, so if in 9 days performance got worse, we could see when that started happening, compare that to a developer commit and work out the cause.
                const newEntry: PerformanceMetrics = {
                    loadTime: navTiming.loadEventEnd,
                    domInteractive: navTiming.domInteractive,
                    ttfb: navTiming.responseStart - navTiming.requestStart,
                    url: page.url(),
                    timestamp: new Date().toISOString()
                };

                let data: PerformanceMetrics[] = [];

                //If the file already exists, make sure you add to it, not overwrite the file
                if (existsSync(filePath)) {
                    const raw = readFileSync(filePath, 'utf-8');
                    try {
                        data = JSON.parse(raw);
                    } catch {
                        //warn the user that the file is being overwritten
                        console.warn('Invalid JSON in existing file. Overwriting.');
                    }
                }

                //Push all the metrics from the test into the file
                data.push(newEntry);
                writeFileSync(filePath, JSON.stringify(data, null, 2));

                //Expect the loadtimes to be within the limits we have set outside the test - if they exceed this, the test should fail.
                expect(newEntry.loadTime).toBeLessThanOrEqual(THRESHOLD);
                expect(newEntry.domInteractive).toBeLessThanOrEqual(DOM_INTERACTIVE_LIMIT);
                expect(newEntry.ttfb).toBeLessThanOrEqual(TTFB_LIMIT);


            }
        );
    });
/*
 * You could continue with the performance for every page using the same structure as above. 
 * You could also use this kind of performance check, as basic as it is, to get an understanding of the whole site/s
 * You can configure the threshholds to allow the tests to fail as well to check that the performance tracking is working as you would expect.
 */