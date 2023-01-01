import { Then } from '@cucumber/cucumber';
import {waitFor, WaitForResult, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from "../env/global";
import {scrollElementIntoView} from "../support/html-behavior";
import {logger} from "../logger";

Then(
    /^I scroll to the "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I scroll to the ${elementKey}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);
                if (elementStable) {
                    await scrollElementIntoView(page, elementIdentifier);
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