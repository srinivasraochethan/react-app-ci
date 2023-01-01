import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from "./setup/world";
import {
    checkElement, unCheckElement,
} from "../support/html-behavior";
import {waitFor, WaitForResult, waitForSelector} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "../env/global";
import {logger} from "../logger";

Then(
    /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
    async function(this: ScenarioWorld, checked: boolean, unchecked: boolean, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I ${unchecked ? 'uncheck' : 'check'} the ${elementKey} checkbox|radio button|switch`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);

                if (elementStable) {
                    if (!!unchecked) {
                        await unCheckElement(page, elementIdentifier);
                        return WaitForResult.PASS;
                    } else {
                        await checkElement(page, elementIdentifier);
                        return WaitForResult.PASS;
                    }
                }
                return WaitForResult.ELEMENT_NOT_AVAILABLE;
            },
            globalConfig,
            {
                target: elementKey
            });
    }
)