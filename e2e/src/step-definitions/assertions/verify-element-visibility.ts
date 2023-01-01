import { Then } from '@cucumber/cucumber';
import { ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import {ScenarioWorld} from "../setup/world";
import {waitFor, WaitForResult} from "../../support/wait-for-behavior";
import {logger} from "../../logger";
import {getElement, getElementAtIndex, getElements} from "../../support/html-behavior";

Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not ': ''}be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const isElementVisible = await getElement(page, elementIdentifier) !== null;
                if (isElementVisible === !negate) {
                    return WaitForResult.PASS;
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementKey}' should ${negate ? 'not ': ''}be displayed`
            });
    }
)

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
    async function(this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementPosition} ${elementKey} should ${negate ? 'not ': ''}be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {
                const isElementVisible = await getElementAtIndex(page, elementIdentifier, elementIndex) !== null;
                if (isElementVisible === !negate) {
                    return WaitForResult.PASS;
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected the '${elementPosition} ${elementKey}' should ${negate ? 'not ': ''}be displayed`
            });
    }
)

Then (
    /^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
    async function(this: ScenarioWorld, negate: boolean, count: string, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I should ${negate ? 'not ': ''}see ${count} ${elementKey} displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elements = await getElements(page, elementIdentifier);
                if ((Number(count) === elements?.length) === !negate) {
                    return WaitForResult.PASS;
                } else {
                    return WaitForResult.ELEMENT_NOT_AVAILABLE;
                }
            },
            globalConfig,
            {
                target: elementKey,
                failureMessage: `Expected to ${negate ? 'not ': ''}see '${count} ${elementKey}' displayed`,
            });
    }
)