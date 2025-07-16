export type Locator = string;

export abstract class BasePage {
  constructor(protected browser: WebdriverIO.Browser) {}

  public abstract init(): void;

  public async open() {
    await this.browser.url('/');
  }

  public abstract checkPageOpenned(): void;
}
