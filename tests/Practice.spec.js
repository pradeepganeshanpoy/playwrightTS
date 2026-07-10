const { test, expect } = require('@playwright/test');
const { PracticePom } = require('../Page Object Practice/PracticePom');
const Inputdata = require('../utils/Inputdata.json');
const { log } = require('console');


test('All Element Practice', async ({ page }) => {

    const practicePom = new PracticePom(page);
    await practicePom.launchURL();
    await practicePom.ActionSection(Inputdata.Test3);
    await practicePom.Pagination();
});