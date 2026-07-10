import { defineConfig, devices, webkit } from '@playwright/test';

require('dotenv').config(); // 🔥 loads .env

export default defineConfig({
  testDir: './tests',
  //testMatch : ["LoggerLearning.spec.js"],
  retries: 1,
  reporter: [
  ['html', { 
    open: 'always',
    title: 'Playwright Automation - Pradeep Kumar'
  }],
  ['allure-playwright', { open: 'always' }],
  ['ortoni-report', { projectName: 'Playwright Automation' }]
],
  //Allure report all Commands in One line  [globally Declared]
  // npm run test
  //npm run allure:generate
  //npm run allure:open

  //Ortoni --> npx ortoni-report show-report
  // use in package file ==> "test:ortoni": "npx playwright test"


  use: {
    baseURL: process.env.LEARN_TEST_FILE_URL,
    workers: 10,
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true, //to handle the ssl certificate errors
    permissions: ['geolocation'], //to handle the permission pop-ups whlile opening the browser.
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 }, },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1280, height: 720 }, },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 720 }, },
    }
  ],
});
