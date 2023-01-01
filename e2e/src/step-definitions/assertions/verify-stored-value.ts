import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from "../setup/world";
import {waitFor, WaitForResult, waitForSelector} from "../../support/wait-for-behavior";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../../env/global";
import {logger} from "../../logger";
import {getElementText} from "../../support/html-behavior";

Then(
    /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: { page },
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not ': ''}equal the ${variableKey} stored in global variables`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);
                const variableValue = globalVariables[variableKey];

                if (elementStable) {
                    const elementText = await getElementText(page, elementIdentifier);
                    if ((elementText === variableValue) === !negate) {
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
                failureMessage: `Expected the '${elementKey}' to ${negate ? 'not ': ''}equal the '${variableKey}' stored in global variables`,
            });
    }
)

Then(
    /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: { page },
            globalConfig,
            globalVariables,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not ': ''}contain the ${variableKey} stored in global variables`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);
                const variableValue = globalVariables[variableKey];

                if (elementStable) {
                    const elementText = await getElementText(page, elementIdentifier);
                    if (elementText?.includes(variableValue) === !negate) {
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
                failureMessage: `Expected the '${elementKey}' to ${negate ? 'not ': ''}contain the '${variableKey}' stored in global variables`,
            });
    }
)

