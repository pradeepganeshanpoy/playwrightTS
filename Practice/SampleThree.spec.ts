import { expect, test, Browser, Locator, Page } from "playwright/test"
import { webkit, chromium, firefox } from 'playwright'


test('Element Practice', async () => {

    const browser:Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    //const page: Page = await browser.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    //Print the Heading 
    const PageTitle = await page.getByText('Practice Page');
    const Pagecontent = await PageTitle.textContent();
    console.log('The heading is :' , Pagecontent);

    //Radio Button
    const radioButton = await page.locator("xpath=//label[@for='radio2']/input[@class='radioButton']");
    const Beforeclick = await radioButton.isChecked();
    console.log('Before click', Beforeclick);

    await radioButton.check();
   
   const Afterclick = await radioButton.isChecked();
    console.log('After click', Afterclick);

    //Auto Suggestive Dropdown

    const Dropdown = await page.locator('input#autocomplete');
    await Dropdown.type("Ind", {delay:500});
    await page.waitForTimeout(1500);

    const country = await page.locator("xpath=//li[@class='ui-menu-item']/div[text()='India']");
    await country.click();
    const countrycontent = await country.textContent();
    console.log("The Selected Dropdown option is : ", countrycontent);

    //Static dropdown
    const staticDropdown = await page.selectOption("select#dropdown-class-example","Option3");
    console.log("Dropdown selected value is : ", staticDropdown);

    //New Window
    // Step 1: Capture the new window by waiting for the 'popup' event
    const [newWindow] = await Promise.all ([
        page.waitForEvent('popup', {timeout:10000}),
        page.click('button#openwindow')
    ]);

    //Step 2: Interact with the new window (popup)

    await newWindow.waitForSelector("//div[@class='section-title mt-50']/h2");
    console.log("New Window Heading : ", await newWindow.title());

    //await newWindow.click("//div[@class='button float-left']/a");
    await newWindow.close();

    const [newtab] = await Promise.all ([

        context.waitForEvent('page'),
        page.click('a#opentab')
    ]);

    const newtabcontent = await newtab.waitForSelector("//div[@class='category-text pt-40']/h2");
    console.log('New tab Acces heading is : ',await newtabcontent.textContent());

    await newtab.close();
    await page.waitForTimeout(5000);
    await page.waitForTimeout(5000);




    
});