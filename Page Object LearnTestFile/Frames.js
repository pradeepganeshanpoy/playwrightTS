class Framehandle {

    constructor(page) {
        this.page = page;

        this.Frame_Btn = page.getByRole('link', { name: 'Iframes' });

        // Store frames ONCE
        this.frame1 = page.frameLocator('#iframe-1');
        this.frame2 = page.frameLocator('#iframe-2');

        // Outside iframe
        this.Frame_One_Content = page.getByRole('heading', { name: 'Iframes' });
        this.Normal_Screen_Content = page.locator('.wp-block-paragraph');

        // Inside iframe-1
        this.Link_Name = this.frame1.locator('.hero__title');
        this.Frame_One_Locator = this.frame1.getByRole('link', { name: 'Get started' });
        this.Frame_Content_One = this.frame1.getByRole('heading', { name: 'Installation' });

        // Inside iframe-2
        this.Frame_Two_Content = this.frame2.getByRole('heading', {
            name: `Selenium automates browsers. That's it!`
        });
    }

    async NavigationURL() {
        await this.Frame_Btn.click();
    }

    async OtherAction() {

        // ---------- FRAME 1 ----------
        await this.Link_Name.waitFor({ state: 'attached', timeout: 60000 });

        console.log(await this.Frame_One_Content.innerText());
        console.log(await this.Link_Name.innerText());

        await this.Frame_One_Locator.click();
        await this.Frame_Content_One.waitFor({ state: 'visible' });
        console.log(await this.Frame_Content_One.innerText());

        // ---------- OUTSIDE FRAME ----------
        console.log(await this.Normal_Screen_Content.first().innerText());

        // ---------- FRAME 2 ----------
        await this.Frame_Two_Content.waitFor({ state: 'visible', timeout: 60000 });

        console.log(await this.Frame_Two_Content.innerText());
    }
}

module.exports = { Framehandle };
