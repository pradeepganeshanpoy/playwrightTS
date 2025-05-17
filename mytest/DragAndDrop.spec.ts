//Drag and drop using single line and multi line commands
import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('Double Click test', async() => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");

    //drag and drop
    //await page.locator("#draggable").dragTo(page.locator("#droppable"));

    //drag and drop in Multiple line command

    await page.locator('#draggable').hover();
    await page.mouse.down();

    await page.locator('#droppable').hover();
    await page.mouse.up();


    await page.waitForTimeout(5000);


});