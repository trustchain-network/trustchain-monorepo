import { UserFactoryService } from '#test/factory/user.factory.service';
import { FakeMailer } from '#test/utils/fake-mailer';
import { TestApp } from '#test/utils/test-app';
import { User } from 'src/modules/users/domain/user';

describe('Modules (e2e)', () => {
  let testApp: TestApp;
  let user: User;
  let userFactory: UserFactoryService;

  beforeAll(async () => {
    testApp = await TestApp.init({
      testingModules: [],
      fakeMailer: new FakeMailer(),
    });
    userFactory = testApp.app.get(UserFactoryService);
    await userFactory.clearTable();
    user = await userFactory.create();
  });

  afterAll(async () => {
    await userFactory.clearTable();
    await testApp.closeApp();
  });

  describe('Login: /auth/email/login (POST)', () => {
    it('OK. Should login user', async () => {
      const { body } = await testApp
        .httpClient()
        .post('/auth/email/login')
        .send({
          email: user.email,
          password: 'secret',
        })
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
          user: expect.objectContaining({
            id: user.id,
          }),
        }),
      );
    });
  });
});
