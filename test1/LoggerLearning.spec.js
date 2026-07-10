import { chromium, test } from "playwright/test";

test("Logger", async()=> {
    const browser = await chromium.launch({
        logger: {
            isEnabled:(name,severity) => true,
            log: (name, severity, message, args) => console.log(`${name} ${message}`)
        }
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://letcode.in/elements");

    await page.locator('#search').click();

    
});