//Authenication Program

import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'


test('auth test', async() => {
    
    const browser:Browser = await chromium.launch({headless: false });
    const context : BrowserContext = await browser.newContext();
    const page:Page = await browser.newPage();

    const username = 'admin';
    const password = 'admin';
    //const authHeader = 'Basic '+ btoa (username+''+password);

    page.setExtraHTTPHeaders({Authorization : createAuthentication(username, password)});
    await page.goto('https://the-internet.herokuapp.com/basis_auth');
    

    //await new Promise (() => {});

});

// another way of writing through Function.

function createAuthentication (username:any, password:any){
    return 'Basic '+ btoa (username+':'+password);
}