const { test } = require('@playwright/test');

exports.test = test.extend({

  testdataforSignin: {
    fname: "Ajith",
    lname: "Kumar",
    Register_username: "ajithkumar01",
    Register_password: "Ajith@123",
    name: "Ajith Shalini",
    Practice_email: "aks01@gmail.com",
    mobile: "9856589652",
    dob: "2025-12-12",
    subjects: "Practice makes man perfect",
    address: "Saibaba colony, Tatabad, Coimbatore",
    file: "test-data/files/download.jpg"
  },

  TestFixture: {
    name: "Siva",
    password: "Siva@12345",
    email: "siva@gmail.com",
    message: "Well done Boys...",
    dropdownvalue: "yes",
    headingtext: "Form Fields ",
    HeadingContent: "Playwright"
  },


});
