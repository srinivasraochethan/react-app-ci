import { Frame, Page } from 'playwright';
import { ElementLocator, GlobalConfig, WaitForTarget, WaitForTargetType } from "../env/global";
import { envNumber } from "../env/parseEnv";
import { logger } from "../logger";
import { handleError } from "./error-helper";

export const enum WaitForResult {
    PASS = 1,
    FAIL = 2,
    ELEMENT_NOT_AVAILABLE = 3,
};

export type WaitForResultWithContext = {
    result: WaitForResult;
    replace?: string;
};

export const waitFor = async <T>(
    predicate: () => WaitForResult | Promise<WaitForResult> | WaitForResultWithContext | Promise<WaitForResultWithContext>,
    globalConfig: GlobalConfig,
    options?: { timeout?: number; wait?: number, target?: WaitForTarget, type?: WaitForTargetType, failureMessage?: string }
): Promise<void> => {
    const { timeout = 20000, wait = 2000, target = '', type = 'element' } = options || {};

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const startDate = new Date();
    let notAvailableContext: string | undefined;

    try {
        while((new Date().getTime() - startDate.getTime()) < timeout) {
            const result = await predicate();
            let resultAs: WaitForResult;

            if ((result as WaitForResultWithContext).result) {
                notAvailableContext = (result as WaitForResultWithContext).replace;
                resultAs = (result as WaitForResultWithContext).result;
            } else {
                resultAs = result as WaitForResult;
            }

            if (resultAs === WaitForResult.PASS) {
                return;
            } else if (resultAs === WaitForResult.FAIL) {
                throw new Error(options?.failureMessage || 'Test assertion failed');
            }

            await sleep(wait);
            logger.debug(`Waiting ${wait}ms`);
        }
        throw new Error(`Wait time of ${timeout}ms for ${notAvailableContext || target} exceeded`);
    } catch (error) {
        handleError(globalConfig.errorsConfig, error as Error, target, type);
    }
}

export const waitForSelector = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await page.waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectorOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await pages[pageIndex].waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const waitForSelectorInIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    try {
        await elementIframe?.waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        });
        return true;
    } catch (e) {
        return false;
    }
};