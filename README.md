# Playwright Testing Suite

This project contains automated tests for key pages of the web application [https://automationintesting.online/](https://automationintesting.online/) using Playwright.  
It covers functionality, performance, and accessibility checks. Performance and accessibility results are saved as JSON files in `test-results/`.

---

## Table of Contents
- [Features](#features)
- [Testing Approach](#testing-approach)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Environment Configuration](#environment-configuration)
- [Performance & Accessibility](#performance--accessibility)

---

## Features
- **Functional Tests**: Verify core workflows on Admin, Bookings, and Front Page.
- **Performance Checks**: Measure page load metrics and output JSON reports.
- **Accessibility Audits**: Run axe-core accessibility scans with results saved as JSON.
- **Configurable Login**: Secure credentials managed via `.env` (excluded from version control).
- **Clean Config**: URLs and sensitive info injected via config/env/pages to keep test code clean.

## Testing Approach
- Uses the **Page Object Model (POM)** design pattern for maintainable test structure.
- Each page has a dedicated Page Object Class with elements and interactions.
- Utilities and helper functions are used to **promote DRY principles** and simplify test maintenance.
- Structured to allow easy expansion and modification of tests.

## Setup & Installation
1. Install dependencies:
    ```bash
    npm install
    npx playwright install
    ```
2. Create a `.env` file in the project root with login credentials:
    ```env
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=password
    ```
3. Ensure Playwright config points to the base URL:
    ```ts
    baseURL: 'https://automationintesting.online/',
    ```
4. Install accessibility tools:
    ```bash
    npm install axe-playwright @axe-core/playwright
    ```

## Usage
- Run **all tests**:
    ```bash
    npx playwright test
    ```
- Run a **specific test file**:
    ```bash
    npx playwright test path/to/testfile.spec.ts
    ```
- View **test reports**:
    ```bash
    npx playwright show-report
    ```

## Environment Configuration
- `.env` file for credentials (never commit this to version control)
- URLs and constants centralized in config files for easy updates

## Performance & Accessibility
- Performance metrics and accessibility results are automatically saved in JSON files inside `test-results/`.
- Use `capturePerformance()` and `assertPerformance()` helpers for page load testing.
- Use `runAxeCheck()` and `saveViolations()` helpers for accessibility testing.