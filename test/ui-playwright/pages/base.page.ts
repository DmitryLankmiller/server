import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  public async open() {
    this.page.goto('/');
  }

  public abstract checkPageOpenned(): void;

  public async saveStorageState(authFile: string) {
    await this.page.context().storageState({ path: authFile });
  }

  public getPage() {
    return this.page;
  }
}
