const { expect } = require('@playwright/test');

class PracticeScreen {

    constructor(page) {
        this.page = page;
        this.checkHeading = page.locator('h1').first();
        this.checkname = page.locator('#name');
        this.Email = page.locator('#email');
        this.genderbtn = page.locator('div.col-sm-3:has-text("Female") input[type="radio"]');
        this.phone = page.locator('#mobile');
        this.DateOfBirth = page.locator('#dob');
        this.Subject = page.locator('#subjects');
        this.Hobby = page.locator('#hobbies');
        this.upload = page.locator("//input[@type='file']");
        this.Address = page.locator("//textarea[@class='form-control']");
        this.State = page.locator('#state');
        this.City = page.locator('#city');
        this.Submit = page.locator("//input[@type='submit']");
    }
    
    async Navigation(){
        await this.page.goto(process.env.NAVIGATION)
    }

    async PracticeValidation(dataValue) {
        await expect(this.checkHeading).toHaveText('Selenium - Automation Practice Form');
        await this.checkname.fill(dataValue.name);
        await this.Email.fill(dataValue.Practice_email);
        await this.genderbtn.check();
        await this.phone.fill(dataValue.mobile);
        await this.DateOfBirth.fill(dataValue.dob);
        await this.Subject.fill(dataValue.subjects);
        await this.Hobby.check();
        await this.upload.setInputFiles(dataValue.file);
        await this.Address.fill(dataValue.address);
        await this.State.selectOption({ value: 'Haryana' });
        await this.City.selectOption({ value: 'Agra' });
        await this.Submit.click();
    }
}

module.exports = {PracticeScreen};



