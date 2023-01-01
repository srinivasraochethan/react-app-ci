import {When, Then, DataTable} from '@cucumber/cucumber';
import {ScenarioWorld} from "../setup/world";
import {waitFor, WaitForResult, waitForSelector} from "../../support/wait-for-behavior";
import {getElementLocator} from "../../support/web-element-helper";
import {ElementKey} from "../../env/global";
import {logger} from "../../logger";
import {getTableData} from "../../support/html-behavior";

When(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} table should ${negate? 'not ': ''}equal the following:`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
                const elementStable = await waitForSelector(page, elementIdentifier);

                if (elementStable) {
                    const tableData = await getTableData(page, elementIdentifier);
                    if (tableData === JSON.stringify(dataTable.raw()) === !negate) {
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
                failureMessage: `Expected the '${elementKey}' table to ${negate? 'not ': ''}equal ${dataTable.raw()}`,
            });
    }
)