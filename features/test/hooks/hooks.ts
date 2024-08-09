const { Before, After } = require('@cucumber/cucumber');

Before(function (scenario) {
  // This hook runs before each scenario
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  //Initialize global variables
  this.remainingBars = [];
  this.remainingBarsDiv = [];
  this.fakeBar = '';
});

After(async function (scenario) {
  // This hook runs after each scenario
  console.log(`Finished scenario: ${scenario.pickle.name}`);
  if (scenario.result.status === 'FAILED') {
    // Take screenshot
    const screenshotBase64 = await browser.takeScreenshot();
    const screenshotBuffer = Buffer.from(screenshotBase64, 'base64');
    // Attach screenshot to report
    this.attach(screenshotBuffer, 'image/png');
  }
});
