
//Open a window in normal mode


import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

//reason to give async and wait

//No of promises, No od Asynchronus APIs, no of Asynchronus of steps are there so we need to give those keywords.

//Simple async and await are used to handle the Asynchronus Api and Asynchronus Calls.

test('AIRA Role locators test', async() => {
    //const browser:BrowserContext = await chromium.launchPersistentContext('', {headless: false}); //chrome

    const browser:BrowserContext = await firefox.launchPersistentContext('', {headless: false}); //firefox

    const pages = browser.pages();
    const page:Page = await pages[0]; //here page acts as a array, which is 0 to 1. so index 0 will open in 1st attempt itself.

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
   
    await page.locator('id=input-firstname').fill("Pradeep");
    await page.locator('id=input-lastname').fill("Kumar");
    await page.screenshot({path: `screenshot.png`});


});