import { setWorldConstructor } from '@wdio/cucumber-framework';

class CustomWorld {
  remainingBars: string[];
  remainingBarsDiv: string[];
  fakeBar: string;
}
setWorldConstructor(CustomWorld);
