import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class CheckShockPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly checkShockBtn: Locator;
  private readonly loginBtn: Locator;
  private readonly notShockedText: Locator;
  private readonly isShockedText: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('main-email-input');
    this.checkShockBtn = page.getByTestId('main-check-button');
    this.loginBtn = page.getByTestId('main-login-button');
    this.notShockedText = page.getByText('Ты еще не в ШОКе');
    this.isShockedText = page.getByText('Ты уже в ШОКе');
  }

  public async checkPageOpenned() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.checkShockBtn).toBeVisible();
  }

  public async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  public async clearEmail() {
    await this.emailInput.clear();
  }

  public async isCheckShockBtnEnabled() {
    return await this.checkShockBtn.isEnabled();
  }

  public async clickCheckShockBtn() {
    await this.checkShockBtn.click();
  }

  public async checkNotShockedTextIsVisible() {
    await expect(this.notShockedText).toBeVisible();
  }

  public async checkIsShockedTextIsVisible() {
    await expect(this.isShockedText).toBeVisible();
  }
}
