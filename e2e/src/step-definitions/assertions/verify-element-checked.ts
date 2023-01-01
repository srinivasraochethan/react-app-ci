import { Then } from '@cucumber/cucumber';
import { ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import {ScenarioWorld} from "../setup/world";
import {waitFor, WaitForResult, waitForSelector} from "../../support/wait-for-behavior";
import {logger} from "../../logger";
import {elementChecked} from "../../support/html-behavior";

Then(
    /^the "([^"]*)" (?:check box|radio button|switch) should( not)? be checked$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} checkbox|radio button|switch should ${negate ? 'not ' : ''}be checked`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);

                if (elementStable) {
                    const isElementChecked = await elementChecked(page, elementIdentifier);
                    if (isElementChecked === !negate) {
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
                failureMessage: `Expected '${elementKey}' to ${negate ? 'not ': ''}be checked`,
            });
    }
)