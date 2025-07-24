import { expect,test,Browser,Page,Locator,chromium, BrowserContext} from "@playwright/test";


test('Navigate the browser and Screenshot', async() => {

    //browser1
    const browser:Browser = await chromium.launch({headless:false});

    const browser1:BrowserContext = await browser.newContext();
    const page1:Page = await browser1.newPage();
    
    await page1.goto('https://stage.shriramgi.com/');
    

    //browser2 with different session
    const browser2 : BrowserContext = await browser.newContext();
    const page2:Page = await browser1.newPage();
    await page2.goto('https://hrportal.novactech.net/HCMS/Login');
    
    await page1.screenshot({path: 'homepage1.png'});
    await page2.screenshot({path: 'homepage2.png'});

    await page1.waitForTimeout(3000);
    await page2.waitForTimeout(3000);

});


test('login test', async() => {
    
    const browser:Browser = await chromium.launch({headless: false });
    
    //BrowserContext 1
    //BrowserContext is nothing but no of copies pages can open without signout/logout.
    //BrowserContext nale incognito tha open aagum.
    
    const browserContext_1 : BrowserContext = await browser.newContext(); 
    const page1:Page = await browserContext_1.newPage();

    await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");

    const emailID1 = await page1.locator("#input-email").fill("pwtest@opencart.com");
    const password1 = await page1.locator("#input-password").fill("playwright@123");
    //const loginbtn1 = await page1.locator("[value ='login']").click();

    //BrowserContext 2
    const browserContext_2 : BrowserContext = await browser.newContext(); 
    const page2:Page = await browserContext_2.newPage();  //ajithkumar@gmail.com ajith@123 ..

    await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");

    const emailID2 = await page2.locator("#input-email").fill("ajithkumar@gmail.com");
    const password2 = await page2.locator("#input-password").fill("ajith@123");
    //const loginbtn2 = await page2.locator("[value ='login']").click();


});
