const { LoginPage } = require('./LoginPage');
const { RegisterPage } = require('./RegisterPage');
const { PracticeScreen } = require('./PracticeFormPage');


class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.registerPage = new RegisterPage(this.page);
        this.practiceScreen = new PracticeScreen(this.page);

    }


    getLoginPage() {
        return this.loginPage;
    }

    getRegisterPage() {
        return this.registerPage;
    }

    getPracticePage() {
        return this.practiceScreen;
    }

}
module.exports={POManager}