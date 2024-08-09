import { Given, Then, When } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ChallengePage from '../pageobjects/challengePage';

/* Navigate to the challenge page url */
Given(/^I am on the Challenge page$/, async () => {
  await browser.url('http://sdetchallenge.fetch.com/');
});

/* Verify the number of gold bars as specified in instructions */
Given(/^there are (\d+) gold bars$/, async function (amount) {
  await ChallengePage.goldContainer.waitForDisplayed();
  const goldBars = await ChallengePage.goldContainer.$$('.square');
  expect(goldBars.length).toEqual(amount);

  for (let i = 0; i < goldBars.length; i++) {
    this.remainingBars.push(await goldBars[i].getText());
  }
});

/* Divide the 9 gold bars into 3 groups */
When(/^I divide the gold bars into (\d+) stacks$/, async function (stackNum) {
  // Get the amount of bars for each stack
  const barsInStack = this.remainingBars.length / stackNum;

  // Store the divided stacks with their bars
  for (let i = 0; i < stackNum; i++) {
    const start = i * barsInStack;
    const end = (i + 1) * barsInStack;
    this.remainingBarsDiv.push({ stack: i + 1, bars: this.remainingBars.slice(start, end) });
  }
});

/* Insert the values of the first group to the left side
   Insert the values of the second group to the right side
   Validate the input squares contain the correct input values */
When(/^I add the (first|second) stack to the (left|right) bowl$/, async function (group, side) {
  let stack;
  switch (group) {
    case 'first':
      stack = this.remainingBarsDiv[0].bars;
      break;
    case 'second':
      stack = this.remainingBarsDiv[1].bars;
      break;
  }
  for (let i = 0; i < stack.length; i++) {
    const insertedBar = await $(`#${side}_${i}`);
    await insertedBar.setValue(stack[i]);
    expect(await insertedBar.getValue()).toEqual(stack[i]);
  }
});

/* Click on the Weigh button and verify the results are displayed
   Click on the Reset button and verify the bowl inputs are all cleared */
Then(/^I click on the (Weigh|Reset) button$/, async (buttonText) => {
  const button = `//button[text()="${buttonText}"]`;
  const gameBoardInputs = await ChallengePage.gameBoardInputs;

  await $(button).waitForDisplayed();
  await $(button).click();

  switch (buttonText) {
    case 'Weigh':
      await ChallengePage.weighInResults.waitForDisplayed();
      expect(await ChallengePage.weighInResults.isDisplayed()).toEqual(true);
      break;
    case 'Reset':
      for (let i = 0; i < gameBoardInputs.length; i++) {
        const value = await gameBoardInputs[i].getValue();
        expect(value).toEqual('');
      }
      break;
  }
});

/* Based on the results from the weighing, we can determine which group has the fake bar */
When(/^I locate the group containing the fake bar$/, async function () {
  await ChallengePage.firstWeighIn.waitForDisplayed();
  const result = await ChallengePage.firstWeighIn.getText();

  if (result.includes('>')) {
    this.remainingBars = this.remainingBarsDiv[1].bars;
  } else if (result.includes('<')) {
    this.remainingBars = this.remainingBarsDiv[0].bars;
  } else {
    // Join the groups containing the real gold bars
    const realGoldBars = this.remainingBarsDiv[1].bars.concat(this.remainingBarsDiv[0].bars);

    // Eliminate the real gold bars from the original array
    // We are left with a smaller group containing the fake bar
    this.remainingBars = this.remainingBars.filter((bar) => !realGoldBars.includes(bar));
  }
});

/* Take 2 of the remaining 3 bars, and insert the first on the left bowl
   and insert the second on the right bowl */
When(/^I set two of the remaining three bars on the bowls$/, async function () {
  await ChallengePage.singleLeftBowl.setValue(this.remainingBars[0]);
  expect(await ChallengePage.singleLeftBowl.getValue()).toEqual(this.remainingBars[0]);

  await ChallengePage.singleRightBowl.setValue(this.remainingBars[1]);
  expect(await ChallengePage.singleRightBowl.getValue()).toEqual(this.remainingBars[1]);
});

/* Based on the results from the weighing, we can determine which of the three is the fake bar */
When(/^I identify the fake bar$/, async function () {
  await ChallengePage.secondWeighIn.waitForDisplayed();
  const result = await ChallengePage.secondWeighIn.getText();

  if (result.includes('>')) {
    this.fakeBar = this.remainingBars[1];
  } else if (result.includes('<')) {
    this.fakeBar = this.remainingBars[0];
  } else {
    this.fakeBar = this.remainingBars[2];
  }
});

/* Click on the number representing the fake bar that was found */
Then('I click on the fake bar', async function () {
  const fakeBar = await $(`#coin_${this.fakeBar}`);
  fakeBar.waitForDisplayed();
  fakeBar.click();
});

/* Verify that the correct alert message is displayed after clicking on the fake bar */
Then(/^I should see the alert "(.*)"$/, async (alertMsg) => {
  const alertText = await browser.getAlertText();
  expect(alertText).toEqual(alertMsg);
});
