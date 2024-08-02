import { $ } from '@wdio/globals';

class ChallengePage {
  public get goldContainer() {
    return $('.coins');
  }

  public get weighInResults() {
    return $('.game-info');
  }

  public get resetButton() {
    return $('#reset');
  }

  public get weighButton() {
    return $('#weigh');
  }

  public get gameBoardInputs() {
    return $$('.game-board input.square');
  }

  public get firstWeighIn() {
    return $('.game-info ol li:nth-of-type(1)');
  }

  public get secondWeighIn() {
    return $('.game-info ol li:nth-of-type(2)');
  }

  public get singleLeftBowl() {
    return $('#left_0');
  }

  public get singleRightBowl() {
    return $('#right_0');
  }
}

export default new ChallengePage();
