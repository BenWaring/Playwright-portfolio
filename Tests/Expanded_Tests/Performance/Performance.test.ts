import { test } from '@playwright/test';
import { PERFORMANCE_PAGES } from './TestConst';
import {PERFORMANCE_METRICS } from './TestConst'
import { capturePerformance, assertPerformance } from '../../../helpers/performance';

test.describe('Performance Checks', { 
  //tag for the CI environment so this can be ran as a group with other expanded tests.
  tag: '@Expanded' }, 
  () => {
  for (const PAGE_INFO of PERFORMANCE_PAGES) {
    test(`Performance - ${PAGE_INFO.name}`, async ({ page }) => {
      
      await page.goto(PAGE_INFO.url);

      //loop through each entry (URL) and capture the performance metrics
      const ENTRY = await capturePerformance(page, PAGE_INFO.name);

      //use the function to check the performance metrics
      assertPerformance(ENTRY, {
        loadTime: PERFORMANCE_METRICS.THRESHOLD,
        domInteractive: PERFORMANCE_METRICS.DOM_INTERACTIVE_LIMIT,
        ttfb: PERFORMANCE_METRICS.TTFB_LIMIT,
      });

    });
  }
});