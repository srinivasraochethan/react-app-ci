import { Then } from '@cucumber/cucumber';
import {waitFor, WaitForResult, waitForSelector, waitForSelectorInIframe} from "../support/wait-for-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from "../env/global";
import {getIFrameElement, inputValueOnIframe} from "../support/html-behavior";
import {logger} from "../logger";

Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, iFrameName: string, inputValue: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`I fill in the ${elementKey} input on the ${iFrameName} iframe with ${inputValue}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const iFrameIdentifier = getElementLocator(page, iFrameName, globalConfig);

        await waitFor(async () => {
                const elementIframe = await getIFrameElement(page, iFrameIdentifier);
                const iFrameStable = await waitForSelector(page, iFrameIdentifier);
                if (iFrameStable) {
                    if (elementIframe) {
                        const elementStable = await waitForSelectorInIframe(elementIframe, elementIdentifier);

                        if (elementStable) {
                            await inputValueOnIframe(elementIframe, elementIdentifier, inputValue);
                            return { result:  WaitForResult.PASS };
                        } else {
                            return { result:  WaitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey };
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
                target: iFrameName
            });
    }
)
