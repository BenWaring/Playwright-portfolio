import { Page } from '@playwright/test';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { injectAxe } from 'axe-playwright';

const ACCESSIBILITY_FOLDER = 'test-results/accessibility-issues';
const SEVERITY_ORDER = ['critical', 'serious', 'moderate', 'minor'];

if (!existsSync(ACCESSIBILITY_FOLDER)) mkdirSync(ACCESSIBILITY_FOLDER, { recursive: true });

export interface AxeViolation {
    id: string;
    impact: 'critical' | 'serious' | 'moderate' | 'minor' | null;
    description: string;
    help: string;
    helpUrl: string;
    nodes: any[];
}

export interface AxeResults {
    violations: AxeViolation[];
}

    /**
     * Runs Axe accessibility checks on the given page.
     *
     * @param page - The Page instance to run accessibility tests on.
     * @returns A Promise resolving to `AxeResults`, containing the accessibility violations and other metadata.
     *
     * @example
     * const results = await runAxeCheck(page);
     * console.log(results.violations);
     *
     * @remarks
     * Violations are sorted by severity, from highest impact to lowest.
     * Requires `injectAxe` to be available in the test context.
     */
    export async function runAxeCheck(page: Page): Promise<AxeResults> {
        await injectAxe(page);

        const results: AxeResults = await page.evaluate(async () => {
            return await (window as any).axe.run();
        });

        //Sort violations
        results.violations.sort((a: AxeViolation, b: AxeViolation) => {
            const aScore = SEVERITY_ORDER.indexOf(a.impact ?? 'minor');
            const bScore = SEVERITY_ORDER.indexOf(b.impact ?? 'minor');
            return aScore - bScore;
        });

        return results;
    }

    /**
     * Saves Axe accessibility violations to a JSON file.
     *
     * @param page - The Page instance for which accessibility was checked.
     * @param results - The `AxeResults` object returned from `runAxeCheck`.
     *
     * @remarks
     * - The file is named based on the page URL. Non-alphanumeric characters are replaced with spaces.
     * - Violations are grouped by impact severity in the saved JSON.
     *
     * @example
     * const results = await runAxeCheck(page);
     * saveViolations(page, results);
     */
    export function saveViolations(page: Page, results: AxeResults) {
        const pathName = new URL(page.url()).pathname.replace(/\W+/g, ' ').trim();
        const fileName = pathName ? `${pathName} accessibility.json` : 'page accessibility.json';
        const filePath = path.join(ACCESSIBILITY_FOLDER, fileName.toLowerCase());

        const exportData = {
            url: page.url(),
            totalViolations: results.violations.length,
            groupedByImpact: results.violations.reduce((acc: Record<string, AxeViolation[]>, v: AxeViolation) => {
                const severity = v.impact || 'minor';
                acc[severity] = acc[severity] || [];
                acc[severity].push(v);
                return acc;
            }, {}),
        };

        writeFileSync(filePath, JSON.stringify(exportData, null, 2));
    }