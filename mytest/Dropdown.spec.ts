//dropdown method #selectOption


import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('Static Dropdown test', async() => {
    const browser:Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();
    
    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/");

    // Select option by value
    const dropdownSelector = 'select#ctl00_mainContent_DropDownListCurrency'; 
    //await page.selectOption(dropdownSelector, 'INR');

    // Select option by label (visible text)
    await page.selectOption(dropdownSelector, {label: 'INR'});

    await page.check('#ctl00_mainContent_chk_friendsandfamily');
    // Select option by index
    //const options = await page.$$(`${dropdownSelector} > option`);
    //const indexToSelect = 0; // zero-based index
    //const valueAtIndex = await options[indexToSelect].getAttribute('value');
    //await page.selectOption(dropdownSelector, valueAtIndex);


    //await new Promise (() => {});

});


test('Auto suggestive Dropdown', async() => {
    const browser:Browser = await chromium.launch({headless: true, slowMo: 100});
    const page:Page = await browser.newPage();
    
    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/");

    await page.fill('#autosuggest', 'IND');

    await page.waitForSelector('.ui-menu-item');

    await page.click('//li[@class="ui-menu-item"]/a[text()="India"]'); //Working

    await browser.close();
    //await new Promise (() => {});

});