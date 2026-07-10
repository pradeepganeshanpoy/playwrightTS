//const { test, expect } = require('@playwright/test');
const { test, expect } = require('../utils/Fixture'); // ✅ import test FROM fixture file
const { POManager } = require('../Pages Object TestFile/POManager');
const path = require('path');

// Load JSON data
//const InputTestData = require('../utils/Inputdata.json');

test(`Test File `, async ({ page,testdataforSignin}) => {

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
    await registerPage.validLogin(testdataforSignin.fname, testdataforSignin.lname, testdataforSignin.Register_username, testdataforSignin.Register_password);

    // ---------- PRACTICE FORM ----------
    const file = path.resolve(testdataforSignin.file);
    const practiceScreen = poManager.getPracticePage();
    await practiceScreen.Navigation();
    await practiceScreen.PracticeValidation(testdataforSignin.name, testdataforSignin.Practice_email, testdataforSignin.mobile, testdataforSignin.dob, testdataforSignin.subjects, file, testdataforSignin.address);

});





//Parameterization in running test with different data.

// for(const InputTestData1 of InputTestData){

// test(`Test File ${InputTestData1.name}`, async ({ page }) => {

//     const poManager = new POManager(page); //Object Created Globally with class name POManager.
//     // ---------- LOGIN ----------
//     const Login_email = process.env.EMAIL;
//     const Loginpassword = process.env.PASSWORD;
//     const loginScreen = poManager.getLoginPage();
//     await loginScreen.navigationUrl();
//     await loginScreen.verify(Login_email, Loginpassword);

//       // ---------- REGISTER ----------
//     const registerPage = poManager.getRegisterPage();
//     await registerPage.goTo();
//     await registerPage.validLogin(InputTestData1.fname, InputTestData1.lname, InputTestData1.Register_username, InputTestData1.Register_password);

//     // ---------- PRACTICE FORM ----------
//     const file = path.resolve(InputTestData1.file);
//     const practiceScreen = poManager.getPracticePage();
//     await practiceScreen.Navigation();
//     await practiceScreen.PracticeValidation(InputTestData1.name, InputTestData1.Practice_email, InputTestData1.mobile, InputTestData1.dob, InputTestData1.subjects, file, InputTestData1.address);

// });

// }