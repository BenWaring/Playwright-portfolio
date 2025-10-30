import { Page } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

//Purpose:
//Capture the performance metrics of a page using the browser’s built-in Navigation Timing API.
//Saves the results into a JSON file for tracking.

export interface PerformanceMetrics {
  loadTime: number;
  domInteractive: number;
  ttfb: number;
  url: string;
  timestamp: string;
}

const FOLDER = 'test-results';
if (!existsSync(FOLDER)) mkdirSync(FOLDER);

  /**
   * Captures and saves page performance metrics to a JSON file.
   *
   * @param page - The current Page instance.
   * @param name - A name for the performance capture, used in the JSON filename.
   * @returns The newly captured performance entry as a `PerformanceMetrics` object.
   *
   * @example
   * const metrics = await capturePerformance(page, 'HomePage Load Test');
   */
  export async function capturePerformance(page: Page, name: string) {
    //Get performance metrics
    const navTiming = await page.evaluate(() => {
      return performance.getEntriesByType('navigation')[0].toJSON();
    });

    const newEntry: PerformanceMetrics = {
      loadTime: navTiming.loadEventEnd,
      domInteractive: navTiming.domInteractive,
      ttfb: navTiming.responseStart - navTiming.requestStart,
      url: page.url(),
      timestamp: new Date().toISOString(),
    };

    //Write to JSON
    const filePath = path.join(FOLDER, `${name} - performance.json`);
    let data: PerformanceMetrics[] = [];

    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, 'utf-8');
      try { data = JSON.parse(raw); } 
      catch { console.warn('Invalid JSON. Overwriting.'); }
    }

    data.push(newEntry);
    writeFileSync(filePath, JSON.stringify(data, null, 2));

    return newEntry;
  }

  /**
   * Asserts that performance metrics do not exceed predefined goals.
   * Can be used as an optional helper instead of, or alongside, `expect()` in tests.
   *
   * @param entry - The measured performance.
   * @param thresholds - Maximum allowed values for performance.
   * @param thresholds.loadTime - Maximum allowed page load time (ms).
   * @param thresholds.domInteractive - Maximum allowed DOM interactive time (ms).
   * @param thresholds.ttfb - Maximum allowed Time To First Byte (ms).
   *
   * @throws Will throw an error if any metric exceeds the threshold.
   *
   * @example
   * assertPerformance(entry, { loadTime: 10000, domInteractive: 5000, ttfb: 200 });
   */
  export function assertPerformance(entry: PerformanceMetrics, thresholds: { loadTime: number; domInteractive: number; ttfb: number }) {
    const { loadTime, domInteractive, ttfb } = thresholds;
    if (entry.loadTime > loadTime) throw new Error(`Load time ${entry.loadTime} exceeded ${loadTime}`);
    if (entry.domInteractive > domInteractive) throw new Error(`DOM interactive ${entry.domInteractive} exceeded ${domInteractive}`);
    if (entry.ttfb > ttfb) throw new Error(`TTFB ${entry.ttfb} exceeded ${ttfb}`);
  }