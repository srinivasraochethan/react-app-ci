import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from "./setup/world";
import {
    clickElement, clickElementAtIndex,
} from "../support/html-behavior";
import {waitFor, WaitForResult, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {logger} from "../logger";

When(
    /^I click the "([^"]*)" (?:button|link|icon|element)$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I click the element ${elementKey} button|link|icon|element`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);
                if (elementStable) {
                    await clickElement(page, elementIdentifier);
                    return WaitForResult.PASS;
                }
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            },
            globalConfig,
            {
                target: elementKey
            });
    }
)

When(
    /^I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element)$/,
    async function(this: ScenarioWorld, elementPosition: string, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I click the ${elementPosition} ${elementKey} button|link|icon|element`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        const elementIndex = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);
                if (elementStable) {
                    await clickElementAtIndex(page, elementIdentifier, elementIndex);
                    return WaitForResult.PASS;
                }
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            },
            globalConfig,
            {
                target: elementKey
            });
    }
)



