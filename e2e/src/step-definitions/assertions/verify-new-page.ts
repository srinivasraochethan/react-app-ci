import { Then } from '@cucumber/cucumber';
import {ScenarioWorld} from "../setup/world";
import {waitFor, WaitForResult, waitForSelector, waitForSelectorOnPage} from "../../support/wait-for-behavior";
import {getElementLocator} from "../../support/web-element-helper";
import {logger} from "../../logger";
import {
    getElementOnPage,
    getElementTextWithinPage,
    getTitleWithinPage
} from "../../support/html-behavior";

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function(this: ScenarioWorld, elementPosition: string, negate: boolean, expectedTitle: string) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        logger.log(`the ${elementPosition} window|tab should ${negate ? 'not ': ''} contain the title ${expectedTitle}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        // this is used because there is no native way to assert correctly on a new tab and not have a fragile test
        await page.waitForTimeout(2000);

        await waitFor(async () => {
                let pages = context.pages();
                const pageTitle = await getTitleWithinPage(page, pages, pageIndex);
                if (pageTitle?.includes(expectedTitle) === !negate) {
                    return WaitForResult.PASS;
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                type: 'title',
                failureMessage: `Expected the '${elementPosition}' window|tab to ${negate ? 'not ': ''} contain the title '${expectedTitle}'`,
            });
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: string, elementPosition: string, negate: boolean) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate? 'not ': ''}be displayed`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                let pages = context.pages();
                const isElementVisible = await getElementOnPage(page, pages, pageIndex, elementIdentifier) !== null;
                if (isElementVisible === !negate) {
                    return WaitForResult.PASS;
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' on the '${elementPosition}' window|tab to ${negate? 'not ': ''}be displayed`,
            });

    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: string, elementPosition: string, negate: boolean, expectedElementText: string) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate? 'not ': ''}contain the text ${expectedElementText}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                let pages = context.pages();

                const elementStable = await waitForSelectorOnPage(pages, pageIndex, elementIdentifier);

                if (elementStable) {
                    const elementText = await getElementTextWithinPage(page, pages, pageIndex, elementIdentifier);
                    if (elementText?.includes(expectedElementText) === !negate) {
                        return WaitForResult.PASS;
                    } else {
                        return WaitForResult.FAIL;
                    }
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' on the '${elementPosition}' window|tab to ${negate? 'not ': ''}contain the text '${expectedElementText}'`,
            });
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: string, elementPosition: string, negate: boolean, expectedElementText: string) {
        const {
            screen: { page, context },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${elementPosition} window|tab should ${negate? 'not ': ''}equal the text ${expectedElementText}`);

        const pageIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                let pages = context.pages();

                const elementStable = await waitForSelectorOnPage(pages, pageIndex, elementIdentifier);

                if (elementStable) {
                    const elementText = await getElementTextWithinPage(page, pages, pageIndex, elementIdentifier);
                    if ((elementText === expectedElementText) === !negate) {
                        return WaitForResult.PASS;
                    } else {
                        return WaitForResult.FAIL;
                    }
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' on the '${elementPosition}' window|tab to ${negate? 'not ': ''}equal the text '${expectedElementText}'`,
            });
    }
)