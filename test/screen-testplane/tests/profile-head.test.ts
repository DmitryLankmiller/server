import { executeLoginStep } from '../utils/auth';

describe('Check user profile head', () => {
  it('Check user header', async ({ browser }) => {
    const mock = await browser.mock('**/auth/login', { method: 'post' });

    mock.respond((resp) => {
      const json = resp.body;
      expect(json['user']).toBeDefined();
      expect(json['user']['name']).toBeDefined();
      expect(json['user']['age']).toBeDefined();
      json['user']['name'] = 'MockName';
      json['user']['age'] = 50;
      return json;
    });

    const profilePage = await executeLoginStep(browser);
    await profilePage.init();
    await profilePage.checkPageOpenned();

    await profilePage.assertViewHeader('default-header');
  });
});
