import { expect, test, Browser, Locator, Page } from "playwright/test";
//import { chromium } from "playwright/test";
import { webkit, chromium, firefox } from 'playwright'
import { link } from "fs";

test("Login Page test", async () => {

    const browser: Browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();
    await page.goto('https://practice.expandtesting.com/login');
    const pageTitle = await page.title();
    console.log("The Url title is : ", pageTitle);


    const username = await page.locator('input#username');

    await username.type("PRADEEP", { delay: 500 });
    await page.waitForTimeout(3000);
    await username.fill("");
    await username.fill("practice");

    const pass = await page.locator('input#password').fill('SuperSecretPassword!');

    const button = await page.click('text="Login"');

    const text = await page.textContent("#username");
    try {
        // Perform assertion directly
        await expect(text).toContain("Hi, practice!");
        console.log('The Text present in the Home Page: ', text);  // Log the text if assertion passes
    } catch (error) {
        // Catch assertion failures and log the error
        console.log('Text does not match or not found');
    }

    const visibletextContent = await page.locator("h4.subheader");
    //const visibleText = await visibletextContent.textContent();
    await expect(visibletextContent).toBeVisible();

    await browser.close();

});


test('Dropdown and radio button', async ({ page }) => {
    await page.goto('https://artoftesting.com/samplesiteforselenium')

    //Printing the title
    const Texttitlelocator = page.locator("xpath = //div[@id='idOfDiv']/p/b[1]");
    const Texttitle = await Texttitlelocator.textContent();
    console.log("Text Content : ", Texttitle);

    //Link test
    const Link: Locator = await page.locator("a[href='http://www.artoftesting.com/sampleSiteForSelenium.html']");

    await Link.click();

    //ENter the text with delay
    const Textfield = await page.locator('[name="firstName"]').type("AJITH KUMAR", { delay: 500 });

    //Just click the button
    const button = await page.click("button#idOfButton");

    //Alert with double click
    page.once('dialog', async dialog => {
        console.log('Alert message:', dialog.message());
        await dialog.accept();
    });

    const dbutton = await page.locator("#dblClkBtn").dblclick();

    //radio button 
    await page.check("input#male");

   //check box
    const checkbox1 = await page.click("input.Automation");

    //Dropdown
    const Dropdown = await page.selectOption('select#testingDropdown', "Manual Testing");

    //drag
    const drag = await page.locator("img#myImage");

    //drop
    const drop = await page.locator("div#targetDiv");

    await drag.dragTo(drop);

    await page.waitForTimeout(5000);






});




