import { setWorldConstructor } from '@wdio/cucumber-framework';

class CustomWorld {
  stack1: string[];
  stack2: string[];
  stack3: string[];
  remainingBars: string[];
  fakeBar: string;
}
setWorldConstructor(CustomWorld);
