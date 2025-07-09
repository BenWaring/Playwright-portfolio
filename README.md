# Playwright Testing Suite
---
For quick access to the project the .rar zipped version of the project would be ideal, however if you wish to see some of the files themselves they can also be found within the repo.
Note that some files missing are specifically for getting Playwright running - I have created all of this to run in VSCode and would recommend running this in the same IDE.
---
This project contains automated tests for key pages of the web page "https://automationintesting.online/" — It checks specifically the: Admin, Bookings, and Front Page — using Playwright. 
It performs both functionality and performance tests, along with accessibility audits powered by axe-playwright.
The performance tests and the accessibility tests both output their findings to JSON files. If you want to delete the JSON files within the test-results folder to check this, feel free.

---
FEATURES:
Functional Tests: Verify core workflows on Admin, Bookings, and Front Page.
Performance Checks: Measure page load metrics and output JSON reports.
Accessibility Audits: Run axe-core accessibility scans with results saved as JSON.
Configurable Login: Secure login credentials managed via a `.env` file (excluded from version control).
Clean Config: URLs and sensitive info are injected from config/env/Pages, keeping the test code clean.
---
TESTING APPROACH:
This project follows the Page Object Model(POM) design to organise and structure tests.
Each page has it's own Page Object Class which contains the elements and interactions of that page.
Where applicable I have used functions and utilities throughout to promote DRY (Don't repeat yourself) principles and improve the maintainability of the tests
This structure makes it easier to expand tests and make sure they are easy to maintain if the application expanded or changed.
---
Setup & Installation:
    npm install
    npx playwright install

    create .env file with login credentials if one does not already exist.
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=password

    In the Playwright config make sure the URL is directing you as follows:
    baseURL: 'https://automationintesting.online/',

    Make sure axe-plawyright is also installed for accessibility tests
    npm install axe-playwright @axe-core/playwright
