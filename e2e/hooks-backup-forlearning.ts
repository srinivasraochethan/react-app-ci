import {Before, After, BeforeAll, AfterAll} from "@cucumber/cucumber";
import {chromium} from "@playwright/test";

// BeforeAll runs only once at the very start of the suite before All the tests are ran
BeforeAll(async() => {
    global.browser = await chromium.launch({
        headless: false, // for CI this will be set to true
    })
});

// After-All runs only once at the very end of the suite after all the tests have run
AfterAll(async() => {
    await global.browser.close(); // clean up and close our browser after all the tests are complete
});

// Before runs, before every single scenario i.e. test
Before(async (scenario) => {
    /*  Context: Isolated incognito like session with the inner browser instance,
        they are fast and cheap to create,
        Playwright recommends to run each test scenario in its own browser context so that the browser state is isolated between tests
     */
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: './reports/videos/' + scenario.pickle.name,
        }
    });
    global.page = await global.context.newPage(); // open up a new page at the start of each test
});

// After runs, after every test
After(async(scenario) => {
    const scenarioStatus = scenario.result?.status;
    if (scenarioStatus === 'FAILED') {
        await global.page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png`
        })
    }
    // cleanup and close our page after each test
    await global.page.close();
});

