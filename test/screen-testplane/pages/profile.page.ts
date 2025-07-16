import { AssertViewOpts } from 'testplane';
import { testIdLocator } from '../utils/locators';
import { BasePage } from './base.page';
import { EditProfilePage } from './edit-profile.page';

export class ProfilePage extends BasePage {
  private header: WebdriverIO.Element;
  private userAvatar: WebdriverIO.Element;
  private userName: WebdriverIO.Element;
  private userStatus: WebdriverIO.Element;
  private editProfileBtn: WebdriverIO.Element;

  constructor(browser: WebdriverIO.Browser) {
    super(browser);
  }

  public async init() {
    this.userAvatar = await this.browser.$(testIdLocator('user-avatar'));
    this.header = await (await this.userAvatar.parentElement()).parentElement();
    this.editProfileBtn = await this.browser.$(testIdLocator('user-edit-profile-button'));
    this.userName = await this.userAvatar.$('xpath=following-sibling::div/div[1]');
    this.userStatus = await this.userAvatar.$('xpath=following-sibling::div/div[2]');
  }

  public async checkPageOpenned() {
    expect(this.userAvatar).toBeDisplayed();
    expect(this.userName).toBeDisplayed();
    expect(this.userStatus).toBeDisplayed();
  }

  public async getUserName() {
    return await this.userName.getText();
  }

  public async getUserStatus() {
    return await this.userStatus.getText();
  }

  public async clickEditProfileBtn() {
    await this.editProfileBtn.click();
    return new EditProfilePage(this.browser);
  }

  public async stopAvatarGif() {
    await this.browser.execute(() => {
      const img = document.querySelector('[data-testid=user-avatar] img');
      img.setAttribute('src', './images/avatar.gif');
    });
  }

  public async assertViewHeader(state: string, opts?: AssertViewOpts) {
    await this.browser.assertView(state, {
      ignoreElements: ['[data-testid=user-avatar] img'],
    });
  }
}
