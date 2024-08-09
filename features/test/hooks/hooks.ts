const { Before, After } = require('@cucumber/cucumber');

Before(function (scenario) {
  // This hook runs before each scenario
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  //Initialize global variables
  this.remainingBars = [];
  this.remainingBarsDiv = [];
  this.fakeBar = '';
});

After(function (scenario) {
  // This hook runs after each scenario
  console.log(`Finished scenario: ${scenario.pickle.name}`);
  if (scenario.result.status === 'failed') {
    const screenshot = browser.takeScreenshot();
    this.attach(screenshot, 'image/png');
  }
});
