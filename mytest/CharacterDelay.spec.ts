import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('Double Click test', async() => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://www.magupdate.co.uk/magazine-subscription/PALI");


    //delay character by character. slow entering
    //await page.getByPlaceholder('Forename').pressSequentially('PRADEEP')

    await page.getByPlaceholder('Forename').pressSequentially('PRADEEP', {delay: 500});

    await page.waitForTimeout(5000);

});