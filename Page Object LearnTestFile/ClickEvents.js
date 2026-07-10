class ClickEvents {

    constructor(page) {
        this.page = page;
        this.clickEvents = page.getByRole('link', { name: 'Click Events' });
        this.CatButton = page.getByText('Cat');
        this.DogButton = page.getByText('Dog');
        this.PigButton = page.getByText('Pig');
        this.CowButton = page.getByText('Cow');
        this.buttonResult = page.locator('#demo');
    }

    async openClickEvents(){
        await this.clickEvents.waitFor({state: 'visible'});
        await this.clickEvents.click();
    }

    async clickButtonAndGetResult(buttonName) {
        const buttonMap = {
            button1: this.CatButton,
            button2: this.DogButton,
            button3: this.PigButton,
            button4: this.CowButton,
        };

        const button = buttonMap[buttonName];
        if (!button) {
            throw new Error(`Invalid button name: ${buttonName}`);
        }

        await button.click();
        await this.buttonResult.waitFor({ state: 'visible' });
        return await this.buttonResult.textContent();
    }
}

module.exports = { ClickEvents };
