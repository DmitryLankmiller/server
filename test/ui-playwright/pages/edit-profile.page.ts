import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProfilePage } from './profile.page';

export class EditProfilePage extends BasePage {
  private readonly editNameInput: Locator;
  private readonly editSaveBtn: Locator;
  private readonly editCancelBtn: Locator;
  private readonly nameRequiredText: Locator;

  constructor(page: Page) {
    super(page);
    this.editNameInput = page.getByTestId('edit-name-input');
    this.editSaveBtn = page.getByTestId('edit-save-button');
    this.editCancelBtn = page.getByTestId('edit-cancel-button');
    this.nameRequiredText = this.editNameInput.locator('xpath=./following-sibling::div[1]');
  }

  public async checkPageOpenned() {
    await expect(this.editNameInput).toBeVisible();
    await expect(this.editSaveBtn).toBeVisible();
    await expect(this.editCancelBtn).toBeVisible();
  }

  public async fillName(name: string) {
    await this.editNameInput.fill(name);
  }

  public async clearName() {
    await this.editNameInput.clear();
  }

  public async clickEditSaveBtn() {
    await this.editSaveBtn.click();
  }

  public async clickEditCancelBtn() {
    await this.editCancelBtn.click();
    return new ProfilePage(this.page);
  }

  public async saveName() {
    await this.editSaveBtn.click();
    let btnText = await this.editSaveBtn.innerText();
    while (btnText != 'Save Changes') {
      btnText = await this.editSaveBtn.innerText();
    }
  }

  public async expectNameRequiredTextToBeVisibleAndGetText() {
    await expect(this.nameRequiredText).toBeVisible();
    return this.nameRequiredText.innerText();
  }
}
