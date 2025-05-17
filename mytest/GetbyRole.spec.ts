//data-testId and Test-dataid is watched by Video.

//GetByRole Find element using ARIA Roles

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {log} from 'console';
import {webkit, chromium, firefox} from 'playwright'


test('AIRA Role locators test', async() => {
    const browser:Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");
   
    await expect(page.getByRole('heading', {name : 'Register Account'})).toBeVisible();

    await expect(page.getByRole('link', {name : 'Forgotten Password'})).toBeVisible();

    await expect(page.getByRole('radio', {name : ' No'})).toBeVisible();

    await page.getByRole('radio', {name : ' No'}).click();

    await expect(page.getByRole('checkbox')).toBeVisible();

    await page.getByRole('checkbox').click(); // Oru web page la oru action tha irukunu sonna, the name is optional to mention.

    await expect(page.getByRole('button', {name : 'Continue'})).toBeVisible();
    await page.getByRole('button', {name : 'Continue'}).click();

    await page.waitForTimeout(5000);

});


