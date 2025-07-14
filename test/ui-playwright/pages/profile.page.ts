import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { EditProfilePage } from './edit-profile.page';

export class ProfilePage extends BasePage {
  private readonly userAvatar: Locator;
  private readonly userName: Locator;
  private readonly userStatus: Locator;
  private readonly editProfileBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.userAvatar = page.getByTestId('user-avatar');
    this.editProfileBtn = page.getByTestId('user-edit-profile-button');
    this.userName = this.userAvatar.locator('xpath=./following-sibling::div/div[1]');
    this.userStatus = this.userAvatar.locator('xpath=following-sibling::div/div[2]');
  }

  public async checkPageOpenned() {
    await expect(this.userAvatar).toBeVisible();
    await expect(this.userName).toBeVisible();
    await expect(this.userStatus).toBeVisible();
  }

  public async getUserName() {
    return await this.userName.innerText();
  }

  public async getUserStatus() {
    return await this.userStatus.innerText();
  }

  public async clickEditProfileBtn() {
    await this.editProfileBtn.click();
    return new EditProfilePage(this.page);
  }
}
