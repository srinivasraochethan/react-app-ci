import { Then } from '@cucumber/cucumber';
import { ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import {ScenarioWorld} from "../setup/world";
import {
    waitFor, WaitForResult, WaitForResultWithContext,
    waitForSelector,
    waitForSelectorInIframe,
    waitForSelectorOnPage
} from "../../support/wait-for-behavior";
import {getElementWithinIframe, getIFrameElement, getTextWithinIframeElement} from "../../support/html-behavior";
import {logger} from "../../logger";

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iFrameName: string, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${iFrameName} iframe should ${negate ? 'not ': ''}be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const iFrameIdentifier = getElementLocator(page, iFrameName, globalConfig);

        await waitFor(async () => {
                const elementIframe = await getIFrameElement(page, iFrameIdentifier);

                if (elementIframe) {
                    const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);

                    if (elementStable) {
                        const isElementVisible = await getElementWithinIframe(elementIframe, elementIdentifier) !== null;
                        if (isElementVisible === !negate) {
                            return { result: WaitForResult.PASS };
                        } else {
                            return { result: WaitForResult.FAIL, replace: elementKey };
                        }
                    } else {
                        return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                    }
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iFrameName };
                }
            },
            globalConfig,
            {
                target: iFrameName,
                failureMessage: `Expected the '${elementKey}' on the '${iFrameName}' iframe should ${negate ? 'not ': ''}be displayed`,
            });
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: string, iFrameName: string, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${iFrameName} iframe should ${negate ? 'not ': ''}contain the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const iFrameIdentifier = getElementLocator(page, iFrameName, globalConfig);

        await waitFor(async () => {
                const elementIframe = await getIFrameElement(page, iFrameIdentifier);

                if (elementIframe) {
                    const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);

                    if (elementStable) {
                        const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier);
                        if (elementText?.includes(expectedElementText) === !negate) {
                            return { result: WaitForResult.PASS };
                        } else {
                            return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                        }
                    } else {
                        return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                    }
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iFrameName };
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' on the '${iFrameName}' iframe should ${negate ? 'not ': ''}contain the text '${expectedElementText}'`,
            });
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: string, iFrameName: string, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} on the ${iFrameName} iframe should ${negate ? 'not ': ''}equal the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const iFrameIdentifier = getElementLocator(page, iFrameName, globalConfig);

        await waitFor(async () => {
                const elementIframe = await getIFrameElement(page, iFrameIdentifier);

                if (elementIframe) {
                    const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);

                    if (elementStable) {
                        const elementText = await getTextWithinIframeElement(elementIframe, elementIdentifier);
                        if ((elementText === expectedElementText) === !negate) {
                            return { result: WaitForResult.PASS };
                        } else {
                            return { result: WaitForResult.FAIL, replace: elementKey };
                        }
                    } else {
                        return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
                    }
                } else {
                    return { result: WaitForResult.ELEMENT_NOT_AVAILABLE, replace: iFrameName };
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' on the '${iFrameName}' iframe should ${negate ? 'not ': ''}equal the text '${expectedElementText}'`,
            });
    }
)