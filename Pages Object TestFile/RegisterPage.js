class RegisterPage {

    constructor(page) {

        this.page = page;
        this.firstname = page.locator('#firstname');
        this.lastname = page.locator('#lastname');
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.reg_button = page.getByRole('button', { name: 'Register' });
    }

    async goTo ()
    {
        await this.page.goto("https://www.tutorialspoint.com/selenium/practice/register.php");
    }

    async validLogin({fname,lname,Register_username,Register_password}) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.username.fill(Register_username);
        await this.password.fill(Register_password);
        await this.reg_button.click();
    }

}

module.exports = {RegisterPage};
