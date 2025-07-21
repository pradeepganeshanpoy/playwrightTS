import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('Frame Test', async()=> {
     test.setTimeout(60000);
    const browser:Browser = await chromium.launch({headless:false});
    const page:Page = await browser.newPage();
    await page.goto("https://jqueryui.com/droppable/");

    const frame = await page.frameLocator('iframe.demo-frame');
    

    const drag = frame.locator('#draggable');

    const drop = frame.locator('#droppable');

    await drag.dragTo(drop);

    await page.getByText("Button").click();
  
   //await browser.close();
    await new Promise (() => {});


});