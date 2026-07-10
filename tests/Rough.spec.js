const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test.describe('Test Group', () => {

    test('Shopping', async ({ page }) => {

        test.setTimeout(200000);
        await page.goto('https://automationexercise.com/');
        console.log(await page.title());

        const Allproducts = page.locator('.features_items .product-image-wrapper'); //Total 34 cards
        const priceValue = await Allproducts.locator('.productinfo h2').allInnerTexts();// 40 price values
        const ProductName = await Allproducts.locator('.productinfo p').allInnerTexts();// 40 product names

        const value = priceValue.map(p => Number(p.replace('Rs.', '').trim()));
        console.log("Total no of products is ", value.length);

        const addtocartbtn = page.locator('.productinfo a:visible');
        let addcount = 0;
        let productstoAdd = [];

        for (let i = 0; i < value.length; i++) {
            if (value[i] >= 2000) {
                productstoAdd.push({ Name: ProductName[i], Value: priceValue[i] });
                await addtocartbtn.nth(i).click();

                const modal = page.locator('.modal-content').first();
                if (await modal.isVisible()) {
                    await page.getByRole('button', { name: 'Continue Shopping' }).click();
                    await modal.waitFor({ state: 'hidden', timeout: 4000 })
                }
                addcount++;
            }
        }
        console.log("Products with price >= 2000:");
        console.table(productstoAdd);
        console.log(`Total no of product added is ${addcount}`) //20
        await page.getByRole('link', { name: ' Cart' }).nth(1).click();

        const cartTable = page.locator('.table tbody');
        await cartTable.waitFor({ state: 'visible', timeout: 10000 });
        const cartcount = await cartTable.locator('tr').count();
        console.log(`Total no of Products in carts are ${cartcount}`);
    });

    test('Dynamic Pagination', async ({ page }) => {

        await page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
        console.log(await page.title());
        const Page = page.locator('.pagination li');
        const PageCount = await Page.count();
        let addtotable = [];
        for (let i = 1; i < PageCount - 1; i++) {
            await Page.nth(i).click();
            await page.waitForSelector('.table tbody tr');
            const rows = page.locator('.table tbody tr');
            const rowscount = await rows.count();
            for (let j = 0; j < rowscount; j++) {
                addtotable.push({
                    StudentName: await rows.nth(j).locator('td.sorting_1').innerText(),
                    Genders: await rows.nth(j).locator('td:nth-child(2)').innerText(),
                    classlevel: await rows.nth(j).locator('td:nth-child(3)').innerText(),
                    Homestate: await rows.nth(j).locator('td:nth-child(4)').innerText(),
                    major: await rows.nth(j).locator('td:nth-child(5)').innerText(),
                    ExtrAct: await rows.nth(j).locator('td:nth-child(6)').innerText(),
                });
            }
        }
        console.table(addtotable);
        console.log('✅ All Page content retrived');



    });

    test('Windows handles', async ({ page }) => {

        await page.goto('https://practice-automation.com/');
        console.log(`The Parent tab title is : ${await page.title()}`);
        await page.getByRole('link', { name: 'Window Operations' }).click();

        //NEW TAB==========================================
        const [Newtab] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'New Tab' }).click()
        ]);

        await Newtab.waitForLoadState();
        //Ftech the New Tab title
        console.log(`The new tab title is : ${await Newtab.title()}`)
        //Print the H2 tag content
        const ContentInNewTab = await Newtab.locator('.entry-content h2').first().textContent();
        console.log(`New Tab Content is : ${ContentInNewTab}`);
        //Click the 2nd Most image(GIT)
        // await Newtab.locator("[alt='Git tutorials']").click();
        // //it will open a new page after clicking
        // console.log(`The  title is : ${)}`)

        await Newtab.close();
        await page.bringToFront();

        //TO REPLACE THE CURRENT WINDOW======================================
        const [ReplaceWindow] = await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }),
            page.getByRole('button', { name: 'Replace Window' }).click()
        ]);
        const subHeading = await page.locator('.wp-block-group h2').textContent();
        console.log(subHeading);
        await page.goBack();
        await page.waitForLoadState();

        // NEW WINDOW (native window - not controllable)=========================================
        const newWindowBtn = page.getByRole('button', { name: 'New Window' });
        await newWindowBtn.waitFor({ state: 'visible' });
        await newWindowBtn.click();
        console.log('New Window button clicked successfully');



    });

    test('Multiple Action', async ({ page }) => {

        await page.goto("https://testautomationpractice.blogspot.com/");
        console.log('Page Title is : ', await page.title());

        const DynamicBtn = page.getByRole('heading', { name: 'Dynamic Button' }).textContent();
        const StartBtn = page.locator('.start').textContent();

        console.log(`First Process - ${await DynamicBtn} ==>  ${await StartBtn}`);
        await page.locator('.start').click();
        const StopBtn = page.locator('.stop').textContent();
        console.log(`Intermediate Process - ${await DynamicBtn} ==>  ${await StopBtn}`);
        await page.locator('.stop').click();
        console.log(`End Process - ${await DynamicBtn} ==>  ${await StartBtn}`);
        console.log('--------------------------------------');
        //=======Alert===========================
        page.on('dialog', async dialog => {
            console.log("Message : ", dialog.message());
            console.log("Type : ", dialog.type());

            if (dialog.type() === 'prompt') {
                await dialog.accept("Pradeep Ganesan");
            } else {
                await dialog.accept();
            }
        });

        await page.getByRole('button', { name: 'Simple Alert' }).click();
        console.log('--------------------------------------');

        await page.getByRole('button', { name: 'Confirmation Alert' }).click();
        const ConformBtn = await page.locator('#demo').textContent();
        console.log('The confirmation text is :', ConformBtn);
        console.log('--------------------------------------');

        await page.getByRole('button', { name: 'Prompt Alert' }).click();
        const PromptBtn = await page.locator('#demo').textContent();
        console.log('The Prompt text is :', PromptBtn);
        console.log('--------------------------------------');

        const [Newtab] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'New Tab' }).click()
        ]);

        await Newtab.close();
        await page.bringToFront();

        //=========Multiple window opens==================
        const Mutlipage = []
        page.on('popup', async newPop => {
            Mutlipage.push(newPop);
        });

        await page.getByRole('button', { name: 'Popup Windows' }).click();

        await page.waitForTimeout(2000);

        for (const p of Mutlipage) {
            await p.waitForLoadState();
            console.log("The Url : ", p.url());
            console.log("The Title : ", await p.title());
        }

        for (const p of Mutlipage) {
            await p.close();
        }

        await page.getByRole('button', { name: 'Point Me' }).hover();

        const hoverOptions = await page.locator('div .dropdown-content a').allTextContents();
        console.log('The Hover options are: ', hoverOptions);
        await page.getByRole('button', { name: 'Copy Text' }).dblclick();

        await page.pause();
        await page.locator('#draggable').dragTo(page.locator('#droppable'));

        await page.locator('#comboBox').click();

        const option = page.locator('text=Item 45');
        await option.scrollIntoViewIfNeeded();
        await option.click();
        console.log('The selected value is : ', await option.innerText());

    });

});

test.describe.parallel.only('Test Table', () => {

    test.beforeEach('Page Navigation', async ({ page }) => {
        await page.goto(process.env.TABLEURL);

    });

    test('Test case 1: Language filter → Java', async ({ page }) => {
        await page.getByLabel(' Java').check();
        const columnList = await page.locator('tbody tr:visible td[data-col="language"]').allTextContents();
        console.log("The Visible Contents are: ", columnList);

        for (const CL of columnList) {
            expect(CL.toLowerCase()).toContain('java');
        }
        console.log("Verified...! Only the JAVA Courses are Visible");

    });

    test('Test case 2: Level filter → Beginner only', async ({ page }) => {

        await page.getByLabel(' Intermediate').uncheck();
        await page.getByLabel(' Advanced').uncheck();
        const level = await page.locator('tbody tr td[data-col="level"]:visible').allTextContents();
        console.log("The Visible contents are: ", level);

        for (const levels of level) {
            expect(levels.toLowerCase()).toContain('beginner')
        }
        console.log("Yes Verified..!, only Beginner levels are visible")

    });

    test('Test case 3: Min enrollments → 10,000+', async ({ page }) => {

        await page.locator(".dropdown-button").click();
        await page.locator(`[data-value="10000"]`).click();

        const enrollments = await page.locator(`tbody tr td[data-col="enrollments"]:visible`).allTextContents();
        console.log(enrollments);
        let array = [];

        for (const end of enrollments) {
            const num = Number(end.replace(/,/g, ''));
            if (num >= 10000) {
                array.push(num);
            }
        }
        console.log("The Enrollments ", array, " are mets the condition....");
    });

    test('Test case 4: Combined filters → Python + Beginner + 10,000+', async ({ page }) => {

        await page.getByLabel(' Python').check();

        await page.getByLabel(' Intermediate').uncheck();
        await page.getByLabel(' Advanced').uncheck();

        await page.locator(".dropdown-button").click();
        await page.locator(`[data-value="10000"]`).click();

        const language = await page.locator('tbody tr:visible td[data-col="language"]').allTextContents();
        const level = await page.locator('tbody tr:visible td[data-col="level"]').allTextContents();
        const enrollments = await page.locator('tbody tr:visible td[data-col="enrollments"]').allTextContents();

        for (let i = 0; i < language.length; i++) {
            expect(language[i]).toContain('Python');
            expect(level[i]).toContain('Beginner');

            const num = Number(enrollments[i].replace(/,/g, ''));
            expect(num).toBeGreaterThanOrEqual(10000);

        }
        console.log(`They are ${language.length} python beginner course with 10000+ enrollments.`)

    });

    test('Test case 5: No results state', async ({ page }) => {

        await page.getByLabel(' Java').check();
        await page.getByLabel(' Beginner').uncheck();
        await page.getByLabel(' Intermediate').uncheck();
        await page.getByLabel(' Advanced').uncheck();
        let notify = await page.locator('#noData').textContent();
        expect.soft(notify.trim()).toBe('No matching courses.');
        //expect.soft(notify).toContain('No matching courses.');
        console.log("Yes, there is No matching courses found.")


    });

    test('Test case 6: Reset button visibility and behavior', async ({ page }) => {
        await page.getByLabel(' Java').check();
        let resetBtn = page.getByRole('button', { name: 'Reset' });
        await expect(resetBtn).toBeVisible();
        await resetBtn.click();
        await expect(page.getByLabel(' Any')).toBeChecked();

        await expect(page.getByLabel(' Beginner')).toBeChecked();
        await expect(page.getByLabel(' Intermediate')).toBeChecked();
        await expect(page.getByLabel(' Advanced')).toBeChecked();
        await expect(page.locator(`.dropdown-menu [data-value="any"]`)).toHaveText('Any');
        await expect(resetBtn).toBeHidden();

        let RowsCount = await page.locator('tbody tr').count();
        let visibleRows = await page.locator('tbody tr:visible').count();
        expect(RowsCount).toBe(visibleRows);
        console.log("Testcase - 6 Passed")
       
    });

    test('Test case 7: Sort by Enrollments (ascending, numeric)', async ({ page }) => {
        
        await page.selectOption('#sortBy', {value:'col_enroll'});
        let rowscount = await page.locator(`tbody tr td[data-col="enrollments"]`).allTextContents();
        console.log(rowscount)
        //const number = rowscount.map(text => Number(text.replace(/,/g,''))); //to change 10,000 to 10000.
        const number = rowscount.map(v => Number(v));
        console.log(number);
        let sortedRows = [...number].sort((a,b)=> a-b);
        expect(number).toEqual(sortedRows);

        console.log("Testcase - 7 Passed")


    });

    test('Test case 8: Sort by Course Name (alphabetical)', async ({ page }) => {
        await page.selectOption('#sortBy', {value:'col_course'});
        let courseName = (await page.locator(`tbody tr td[data-col="course"]`).allInnerTexts()).map(name => name.trim());
        console.log(courseName);
        expect(courseName).toEqual([...courseName].sort((a,b) => a.localeCompare(b)));

        await page.selectOption('#sortBy', {value:'col_id'});
        let AfterfilterchangecourseName = (await page.locator(`tbody tr td[data-col="course"]`).allInnerTexts()).map(name => name.trim());
        expect(AfterfilterchangecourseName).not.toEqual([...AfterfilterchangecourseName].sort((a,b)=> a.localeCompare(b)));
    });

});