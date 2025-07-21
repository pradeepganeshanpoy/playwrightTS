//mouse clicks 

//double click, right/context click, shift click, hover

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('Double Click test', async() => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    //test.setTimeout(10000)
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html");

    //double click in mouse
    await page.getByText('Double-Click Me To See Alert').dblclick();

    await page.waitForTimeout(3000); 

    page.on('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept();
  });

    //right click or context click
    await page.getByText('right click me').click({button: 'right'});

    await page.waitForTimeout(3000);

    //shift click via mouse
    await page.goto("https://the-internet.herokuapp.com/shifting_content");
    await page.getByText('Example 1: Menu Element').click({modifiers : ['Shift'] }); 

    await page.waitForTimeout(3000);


});