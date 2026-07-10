class PopUps {

    constructor(page) {

        //Alerts
        this.page = page;
        this.Popbtn_Click = page.getByRole('link', { name: 'Popups' });
        this.AlertBtn = page.locator('#alert');
        this.ConfirmPop = page.locator('#confirm');
        this.PromptPop = page.locator('#prompt');
        this.ConfirmResult = page.locator('#confirmResult');
        this.PromptResult = page.locator('#promptResult');

    }

    // ✅ NEW METHOD (only navigation inside the page)
    async openPopups(){
        await this.Popbtn_Click.waitFor({ state: 'visible' });
        await this.Popbtn_Click.click();
    }

    async alertAction(button) {
        let result = '';

        this.page.once('dialog', async dialog => {
            console.log('Alert Text: ', dialog.message());
            console.log('Alert Type: ', dialog.type());

            if (dialog.type() === 'confirm') {
                await dialog.accept();
            } else if (dialog.type() === 'prompt') {
                await dialog.accept("Pradeep");
            } else {
                await dialog.accept();
            }
        });

        await button.click();

        if (button === this.ConfirmPop) {
            result = await this.ConfirmResult.textContent();
        } else if (button === this.PromptPop) {
            result = await this.PromptResult.textContent();
        }
        console.log('Result :', result);
        return result;

    }
}
module.exports = { PopUps };