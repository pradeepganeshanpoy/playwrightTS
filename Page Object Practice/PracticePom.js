const { expect } = require('@playwright/test');
class PracticePom {

    constructor(page) {
        this.page = page;
        this.titleheading = page.locator('//h1[@class="title"]');
        this.Name = page.getByPlaceholder("Enter Name");
        this.EMail = page.getByPlaceholder("Enter EMail");
        this.Phone = page.getByPlaceholder("Enter Phone");
        this.Address = page.locator('#textarea');
        this.RadioGenderBtn = page.locator('#male');
        //this.CheckBox = page.getByRole('checkbox', { name: 'wednesday' })
        this.AllCheckBox = page.locator(`div[class="form-group"] [type='checkbox']`);
        this.DropdownIndia = page.locator('#country');
        this.Dropdowncolors = page.locator('#colors');
        this.Dropdownanimals = page.locator('#animals');
        this.Textdate = page.locator('#datepicker');
        this.Datefield = page.locator('#txtDate');
        this.DateYear = page.locator('.ui-datepicker-year');
        this.DateMonth = page.locator('.ui-datepicker-month');
        this.StartDate = page.locator('#start-date');
        this.EndDate = page.locator('#end-date');
        this.DateSubmitBtn = page.locator('.submit-btn');
        this.TableContent = page.locator(`table[name='BookTable'] tr td:nth-child(3)`)
        this.AllPage = page.locator(`#pagination a`);
        this.AlltableCheckBox = page.locator(`table[id="productTable"] input[type="checkbox"]`);

    }

    async launchURL() {
        await this.page.goto(process.env.PPURL);
        console.log('PPURL:', process.env.PPURL);
        const heading = (await this.titleheading.textContent())?.trim();
        console.log(`Heading name is : ${heading}`);
    }

    async selectdate(testData) {
        const { year, month, date } = testData.uiDate;
        await this.Datefield.click();
        await this.DateYear.selectOption(year.toString());
        await this.DateMonth.selectOption(month.toString());
        await this.page.locator(`//td[@data-year='${year}' and @data-month='${month}']//a[text()='${date}']`).click();
    }

    async Pagination() {
        const Pages = await this.AllPage;//All page button links
        
        for (let i = 0; i < await Pages.count(); i++) {
            console.log(`--- Page ${i + 1} ---`);
            const TableCBox = this.AlltableCheckBox; //All checkboxes

            for (let j = 0; j < await TableCBox.count(); j++) {
                await TableCBox.nth(j).check();
                await expect(TableCBox.nth(j)).toBeChecked();
            }
            if (i < (await Pages.count()) - 1) {
                await Pages.nth(i + 1).click();
                await this.page.waitForLoadState('networkidle');
            }
        }
        console.log('✅ All checkboxes on all pages are checked');
    }

    async ActionSection(data) {
        await this.Name.fill(data.Name);
        await this.EMail.fill(data.EMail);
        await this.Phone.fill(data.Phone);
        await this.Address.fill(data.Address);
        const Genderbtn = this.RadioGenderBtn;
        await Genderbtn.check();
        await expect(Genderbtn).toBeChecked();
        const days = await this.AllCheckBox;
        const daysCount = await days.count();

        for (let i = 0; i < daysCount; i++) {
            await days.nth(i).check();
            await expect(days.nth(i)).toBeChecked();
        }
        console.log("✅ All checkboxes are checked");
        await this.DropdownIndia.selectOption({ value: data.Country });
        console.log('The Selected Value is: ', await this.DropdownIndia.inputValue());
        await this.Dropdowncolors.selectOption({ value: data.Color });
        await this.Dropdownanimals.selectOption({ value: data.Animal });
        await this.Textdate.fill(data.Dob);
        await this.selectdate(data);
        await this.StartDate.fill(data.StartDate);
        await this.EndDate.fill(data.EndDate);
        await this.DateSubmitBtn.click();
        const msg = await this.TableContent.allTextContents();
        console.log(`Type : ${Array.isArray(msg)}, Value:`, msg);
        const sortedmsg = [...new Set(msg)];
        //const sortedmsg = msg.filter((value, index) => msg(value) === index); 
        console.log(`Sortedmsg:`, sortedmsg);

    }
}
module.exports = { PracticePom }