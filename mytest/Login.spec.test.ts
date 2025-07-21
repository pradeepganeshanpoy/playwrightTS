import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('login test', async() => {
    test.setTimeout(6000);
    const browser:Browser = await chromium.launch({headless: false });
    const page:Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");

    const emailID = await page.locator("#input-email").fill("pwtest@opencart.com");
    const password = await page.locator("#input-password").fill("playwright@123");
    //const loginbtn = await page.locator("[value ='login']").click();

    const title = await page.title();
    console.log("Home Page title", title);

    await page.screenshot({path: 'homepage2.png'});

    expect(title).toEqual('Account Login');

    await browser.close();

});