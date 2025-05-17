
//Open a window in normal mode


import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('AIRA Role locators test', async() => {
    //const browser:BrowserContext = await chromium.launchPersistentContext('', {headless: false}); //chrome

    const browser:BrowserContext = await firefox.launchPersistentContext('', {headless: false}); //firefox

    const pages = browser.pages();
    const page:Page = await pages[0]; //here page acts as a array, which is 0 to 1. so index 0 will open in 1st attempt itself.

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
   
    await page.locator('id=input-firstname').fill("Pradeep");
    await page.locator('id=input-lastname').fill("Kumar");


});