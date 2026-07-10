class LoginPage {


    constructor(page) {
        this.page = page;
        this.enteremail = page.locator('#email');
        this.enterpassword = page.locator('#password');
        this.submitButton = page.locator("//input[@type='submit']");

    }

    async navigationUrl(){
        await this.page.goto(process.env.URL);
    }

    async verify(Login_email,Loginpassword) {
        await this.enteremail.fill(Login_email);
        await this.enterpassword.fill(Loginpassword);
        await this.submitButton.click();
    }
}
module.exports =  {LoginPage}