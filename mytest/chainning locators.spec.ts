

// chainning locator/ Selectors

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('chainning locators test', async() => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://orangehrm.com/en/30-day-free-trial");

/*     await page.locator('form#Form_getForm >> #Form_getForm_Name').fill("kumar");

    await page.locator('form#Form_getForm >> #Form_getForm_Email').fill("kumar@gmail.com");

    await page.locator('form#Form_getForm >> #Form_getForm_Contact').fill("9080301655");

    await page.locator('form#Form_getForm >> #Form_getForm_action_submitForm').click(); */


    //combining the ARIA role methods and chainning locator method

    await page.locator('form#Form_getForm').getByRole('textbox', { name:'Your Full Name'}).fill("Kumar");

         //const form = page.locator('form#Form_getForm');

        //const getyourfreetrailButton = page.getByRole('button', { name:'Get Your Free Trial'});

        //writing the above 2lines in singlr line

    await page.locator('form#Form_getForm').getByRole('button', { name:'Get Your Free Trial'}).click();

        //await form.locator(getyourfreetrailButton).click();

    await page.waitForTimeout(3000);
});