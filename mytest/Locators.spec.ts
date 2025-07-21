
//Locators (ID, Classname, Text, Css Selector,Xpath)

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('locators test', async() => {
    const browser:Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
    test.setTimeout(30000)
    //Create a WeBelement (locators) + Perform the action on it (click, fill)

    //1.ID - Unique

    const firstName:Locator = page.locator('#input-firstname');
    const lastName:Locator = page.locator('id=input-lastname');


    await firstName.fill("Pradeep");
    await lastName.fill("Kumar");

    //2.class

    const logo:Locator = page.locator(".img-responsive");
    const logoExist = await logo.isEnabled();
    console.log(logoExist);

    //3. Text locator

    const header:Locator = page.locator("text=Register Account");
    const headerExist = await logo.isEnabled();
    console.log(headerExist);

    //4. Css selectors

    const emailid:Locator = page.locator('css=input#input-email');
    const telephone:Locator = page.locator('css=input[name="telephone"]');
    const checkbox:Locator = page.locator('css=input[type="checkbox"]');

    await emailid.fill("rohit@gmail.com");
    await telephone.fill("8070304050");
    await checkbox.click();

    //5. Xpath

    const password:Locator = page.locator("xpath=//input[@id='input-password' and @type='password']");
    await password.fill("rohit@123")

    const search:Locator = page.locator("xpath=//input[@name = 'search']");
    await search.fill("macboook")


    //await new Promise (() => {});

});