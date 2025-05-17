import { test, expect, Browser, Page, Locator } from '@playwright/test';
import { chromium } from 'playwright';

test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.goto("https://stage.shriramgi.com/");

  // Locators
  const regnum: Locator = page.locator("xpath=//input[@id='reg_number' and @type='text']");
  const mobnum: Locator = page.locator('#mobile_number');
  const checkbox: Locator = page.locator("xpath=//label[@id='ippqgh']");
  const insurebutton: Locator = page.locator('#homeCarFormSubmit');
  

  // Actions
  await regnum.fill("TN02GH6765");
  await mobnum.fill("9080302585");
  await checkbox.click();
  await insurebutton.click();
  

  // OTP Inputs
  await page.waitForTimeout(5000); // simulate wait for OTP screen (not ideal, but okay for demo)

  const otp1: Locator = page.locator('#otp1');
  const otp2: Locator = page.locator('#otp2');
  const otp3: Locator = page.locator('#otp3');
  const otp4: Locator = page.locator('#otp4');

  await otp1.fill("1");
  await otp2.fill("1");
  await otp3.fill("1");
  await otp4.fill("1");

  //const otpbtn:Locator = page.locator('#verifyotpCar')

  //await otpbtn.click();

  // Assertions
  const title = await page.title();
  console.log("Home Page title:", title);
  await page.screenshot({ path: 'homepage.png' });

  expect(title).toEqual('Buy Car Insurance Online today | Shriram General Insurance');

  await browser.close();
});
