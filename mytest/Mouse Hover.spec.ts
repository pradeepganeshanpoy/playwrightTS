// Mouse hover

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('Mouse hover test', async() => {
    const browser:Browser = await webkit.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://www.spicejet.com/");

    page.getByText('Add-ons').first().hover();

    page.getByText('taxi').first().click();

    await page.waitForTimeout(15000);

});