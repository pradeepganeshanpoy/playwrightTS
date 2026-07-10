const { expect } = require('@playwright/test');

class FormFields {
    constructor(page) {
        this.page = page;
        this.btn_Click = page.getByRole('link', { name: 'Form Fields' });
        this.heading = page.getByRole('heading', { level: 1 });
        this.formName = page.locator('#name-input');
        this.formPassword = page.locator("input[type='password']");
        this.formCheck = page.locator("input[value='Wine']");
        this.formRadio = page.getByTestId('color2');
        this.formDropdown = page.locator('#automation');
        this.ContentMatch = page.locator('//li[text()="Playwright"]');
        this.FormMail = page.getByTestId('email');
        this.FormMessage = page.locator('#message');
        this.FormSubmit = page.getByTestId('submit-btn');

    }

    async NavigationUrl() {
        await this.page.goto(process.env.LEARN_TEST_FILE_URL);
    }

    async SumbitAlert() {

        this.page.once('dialog', dialog => {
            console.log('Alert Text: ', dialog.message());
            console.log('Alert Type: ', dialog.type())
            dialog.accept();
        });
        await this.FormSubmit.waitFor({ state: 'visible' });
        await this.FormSubmit.click();

    }


    async ElementAction({name, password, email, message, dropdownvalue, headingtext, HeadingContent}) {
        await this.btn_Click.click();
        await expect(this.heading).toHaveText(headingtext);
        await this.formName.fill(name);
        await this.formPassword.fill(password);
        await this.formCheck.check();
        await this.formRadio.check();
        await this.formDropdown.selectOption({ value: dropdownvalue });
        await expect(this.ContentMatch).toHaveText(HeadingContent);
        await this.FormMail.fill(email);
        await this.FormMessage.fill(message);

    }

}

module.exports = { FormFields };
