import { EditProfilePage } from '../pages/edit-profile.page';
import { executeLoginStep } from '../utils/auth';

const openEditProfilePage = async (browser: WebdriverIO.Browser) => {
  await executeLoginStep(browser);
  const editProfilePage = new EditProfilePage(browser);
  await editProfilePage.open();
  await editProfilePage.init();
  await editProfilePage.checkPageOpenned();
  return editProfilePage;
};

describe('Check edit profile form', () => {
  it('Default editProfileForm state', async ({ browser }) => {
    await openEditProfilePage(browser);
    const editProfilePage = await openEditProfilePage(browser);

    await editProfilePage.clearName();

    await editProfilePage.assertViewEditProfileForm('default');
  });

  it('Name is required state', async ({ browser }) => {
    const editProfilePage = await openEditProfilePage(browser);

    await editProfilePage.clearName();
    await editProfilePage.clickEditSaveBtn();

    await editProfilePage.assertViewEditProfileForm('nameRequired');
  });

  it('Name is filled state', async ({ browser }) => {
    const editProfilePage = await openEditProfilePage(browser);

    await editProfilePage.fillName('Neko');

    await editProfilePage.assertViewEditProfileForm('filledName');
  });
});
