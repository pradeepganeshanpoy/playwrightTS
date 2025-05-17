//dropdown method #selectOption


import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {log} from 'console';
import {webkit, chromium, firefox} from 'playwright'


test('Dropdown test', async() => {
    const browser:Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto("https://www.magupdate.co.uk/magazine-subscription/PALI");


    //await page.getByRole('radio', { : ' Request/Enquire'}).click();

    const countryDropdown = 'select#Contact_CountryCode';

   // await page.selectOption(countryDropdown,{ value : 'DE' }); //using value

    //await page.selectOption(countryDropdown,{ label : 'Nepal' }); //using label

    //await page.selectOption(countryDropdown,{ index : 45 }); //using index


    //select#Contact_CountryCode>option
    
    const allOptions = await page.$$(countryDropdown + '> Option');

    console.log((allOptions).length);

    //to print all the 252 country


    for(const e of allOptions){
        const text = await e.textContent();
        console.log(text);
        if(text === 'India'){
            await page.selectOption(countryDropdown,{ label : text });
        }
    }
    
    await page.waitForTimeout(5000);

});