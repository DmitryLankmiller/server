import { AssertViewOpts } from 'testplane';
import { testIdLocator } from '../utils/locators';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class EditProfilePage extends BasePage {
  private editNameInput: WebdriverIO.Element;
  private editSaveBtn: WebdriverIO.Element;
  private editCancelBtn: WebdriverIO.Element;

  constructor(browser: WebdriverIO.Browser) {
    super(browser);
  }

  public async init() {
    this.editNameInput = await this.browser.$(testIdLocator('edit-name-input'));
    this.editSaveBtn = await this.browser.$(testIdLocator('edit-save-button'));
    this.editCancelBtn = await this.browser.$(testIdLocator('edit-cancel-button'));
  }

  public async open() {
    await this.browser.url('/edit');
  }

  public async checkPageOpenned() {
    expect(this.editNameInput).toBeDisplayed();
    expect(this.editSaveBtn).toBeDisplayed();
    expect(this.editCancelBtn).toBeDisplayed();
  }

  public async fillName(name: string) {
    await this.editNameInput.setValue(name);
  }

  public async clearName() {
    await this.editNameInput.clearValue();
  }

  public async clickEditSaveBtn() {
    await this.editSaveBtn.click();
  }

  public async clickEditCancelBtn() {
    await this.editCancelBtn.click();
    return new ProfilePage(this.browser);
  }

  public async saveName() {
    await this.editSaveBtn.click();
    let btnText = await this.editSaveBtn.getText();
    while (btnText != 'Save Changes') {
      btnText = await this.editSaveBtn.getText();
    }
  }

  public async assertViewEditProfileForm(state: string, opts?: AssertViewOpts) {
    await this.browser.assertView(state, opts);
  }
}
