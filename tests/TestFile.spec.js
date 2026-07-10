const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages Object TestFile/POManager');
const path = require('path');

// Load JSON data
const InputTestData = require('../utils/Inputdata.json');

test(`Test File `, async ({page}) => {

    const poManager = new POManager(page); //Object Created Globally with class name POManager.

    // ---------- LOGIN ----------
    const Login_email = process.env.EMAIL;
    const Loginpassword = process.env.PASSWORD;
    const loginScreen = poManager.getLoginPage();
    await loginScreen.navigationUrl();
    await loginScreen.verify(Login_email, Loginpassword);

      // ---------- REGISTER ----------
    const registerPage = poManager.getRegisterPage();
    await registerPage.goTo();
    await registerPage.validLogin(InputTestData.Test1);

    // ---------- PRACTICE FORM ----------
    const file = path.resolve(InputTestData.Test1.file);
    const practiceScreen = poManager.getPracticePage();
    await practiceScreen.Navigation();
    //await practiceScreen.PracticeValidation(InputTestData.Test1.name, InputTestData.Test1.Practice_email, InputTestData.Test1.mobile, InputTestData.Test1.dob, InputTestData.Test1.subjects, file, InputTestData.Test1.address);

    await practiceScreen.PracticeValidation(InputTestData.Test1);

});