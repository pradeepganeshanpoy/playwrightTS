import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import path from 'path';
import {webkit, chromium, firefox} from 'playwright'


test('File upload test', async() => {
    //const browser:BrowserContext = await chromium.launchPersistentContext('', {headless: false}); //chrome

    const browser:BrowserContext = await firefox.launchPersistentContext('', {headless: false}); //firefox

    const pages = browser.pages();
    const page:Page = await pages[0]; //here page acts as a array, which is 0 to 1. so index 0 will open in 1st attempt itself.

    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    //single upload
    //await page.locator("input[name='filesToUpload']").setInputFiles(path.join("C:/Users/p1279/Pictures/testing_file_upload/download2.jpg"));



    //Multiple uppload

     await page.locator("input[name='filesToUpload']")
        .setInputFiles([
            path.join("C:/Users/p1279/Pictures/testing_file_upload/TEST.png"),
            path.join("C:/Users/p1279/Pictures/testing_file_upload/logo.jpg")]);

 
    //De-Select the files 
    await page.locator("input[name='filesToUpload']").setInputFiles([]);

    await page.waitForTimeout(5000);




});
   