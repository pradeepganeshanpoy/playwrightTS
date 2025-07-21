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


test('New Tab', async()=> {

    const browser:Browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page1:Page = await context.newPage();
    const page2:Page = await context.newPage();

    await page1.goto("https://playwright.dev/")

    await page2.goto("https://stage.shriramgi.com/");

   await page2.goBack();

   const title = await page1.title();

  console.log("Page 1 title is :", title);

  





});