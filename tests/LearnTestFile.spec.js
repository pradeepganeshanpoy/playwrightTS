//const { test, expect } = require('@playwright/test'); Note : if we use fixtures then this line should present in fixture file.

const { test, expect } = require('../utils/Fixture'); // ✅ import test FROM fixture file
//const  TestData  = require('../utils/Inputdata.json'); // ✅ import Datas FROM JSON file

const { FormFields } = require('../Page Object LearnTestFile/FormFields');
const { PopUps } = require('../Page Object LearnTestFile/Popup');
const { ClickEvents } = require('../Page Object LearnTestFile/ClickEvents');
const { Framehandle } = require('../Page Object LearnTestFile/Frames');

//const { fakerEN_IN } = require('@faker-js/faker');


test('Learn & Practice', async ({ page, TestFixture }) => {

    await page.goto('/');

    const formfields = new FormFields(page); //-------formfield Screen Object creation-----------
    const popups = new PopUps(page); //-------Popop Screen Object creation-----------
    const clickEvents = new ClickEvents(page); //-------ClickEvents Screen Object creation-----------
     const framehandle = new Framehandle(page); //-------Frames Screen Object creation-----------

    await formfields.ElementAction(TestFixture);
    await formfields.SumbitAlert();
    await page.goBack();

    await popups.openPopups();
    await popups.alertAction(popups.AlertBtn);
    await popups.alertAction(popups.ConfirmPop);
    await popups.alertAction(popups.PromptPop);
    await page.goBack();

    await clickEvents.openClickEvents();
    const buttons = ["button1", "button2", "button3", "button4"];
    for (const btn of buttons) {
        const ButtonResult = await clickEvents.clickButtonAndGetResult(btn);
        console.log(`${btn} clicked -> Result: ${ButtonResult}`)
    }
    await page.goBack();

    await framehandle.NavigationURL();
    await framehandle.OtherAction();
    
    


});