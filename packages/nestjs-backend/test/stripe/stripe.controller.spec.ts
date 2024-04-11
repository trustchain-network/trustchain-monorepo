import { MembershipFactoryService } from '#test/factory/membership.factory.service';
import { RoleFactoryService } from '#test/factory/role.factory.service';
import {
  TAuthData,
  UserFactoryService,
} from '#test/factory/user.factory.service';
import { StripeMock } from '#test/utils/stripe.mock';
import TestApp from '#test/utils/test-app';
import { MembershipsModule } from 'src/modules/membership/memberships.module';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { User } from 'src/modules/users/domain/user';
import { StripeModule } from 'src/providers/stripe/stripe.module';
import { stripeProvisionToken } from 'src/providers/stripe/stripe.provider';

describe('StripeController (e2e)', () => {
  let testApp: TestApp;
  let userFactory: UserFactoryService;
  let roleFactory: RoleFactoryService;
  let membershipFactory: MembershipFactoryService;
  let stripeMock: StripeMock;

  let user: User;
  let authData: TAuthData;

  beforeAll(async () => {
    testApp = await TestApp.init({
      testingModules: [StripeModule, MembershipsModule],
      stripeMock: new StripeMock(),
    });
    userFactory = testApp.app.get(UserFactoryService);
    roleFactory = testApp.app.get(RoleFactoryService);
    membershipFactory = testApp.app.get(MembershipFactoryService);

    stripeMock = testApp.app.get<StripeMock>(stripeProvisionToken);

    await membershipFactory.clearTable();
    await userFactory.clearTable();
    await roleFactory.setup();
  });

  beforeEach(async () => {
    [user, authData] = await userFactory.createLoggedIn({
      roleId: RoleEnum.user,
    });
  });

  afterEach(async () => {
    await membershipFactory.clearTable();
    await userFactory.clearTable();

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await roleFactory.clearTable();

    await testApp.closeApp();
  });

  describe('Product list: /stripe/products (GET)', () => {
    it('OK 200. Got prod list', async () => {
      const data = [{ id: 'prod_1' }, { id: 'prod_2' }];
      stripeMock.products.list.mockResolvedValueOnce({ data });

      const { body } = await testApp
        .httpClient()
        .get('/stripe/products')
        .expect(200);

      expect(body).toEqual(data);

      expect(stripeMock.products.list).toHaveBeenCalledTimes(1);
      expect(stripeMock.products.list).toHaveBeenCalledWith({
        active: true,
        expand: ['data.default_price'],
      });
    });
  });

  describe('Subscriptions list: /stripe/subscriptions (GET)', () => {
    it('OK 200. Got stripe subs list', async () => {
      const { customerId: customer } = await membershipFactory.create({
        userId: user.id,
      });
      const data = [{ id: 'sub_1' }];
      stripeMock.subscriptions.list.mockResolvedValueOnce({ data });

      const { body } = await testApp
        .httpClient()
        .get('/stripe/subscriptions')
        .auth(...authData)
        .auth(await userFactory.getAuthToken(user), { type: 'bearer' })
        .expect(200);

      expect(body).toEqual(data);

      expect(stripeMock.subscriptions.list).toHaveBeenCalledTimes(1);
      expect(stripeMock.subscriptions.list).toHaveBeenCalledWith({ customer });
    });

    it('OK 200. Got empty list for user without customer id', async () => {
      const { body } = await testApp
        .httpClient()
        .get('/stripe/subscriptions')
        .auth(...authData)
        .auth(await userFactory.getAuthToken(user), { type: 'bearer' })
        .expect(200);

      expect(body).toEqual([]);

      expect(stripeMock.subscriptions.list).not.toHaveBeenCalled();
    });

    it('FAIL 401. Unauthorized', async () => {
      await testApp.httpClient().get('/stripe/subscriptions').expect(401);

      expect(stripeMock.subscriptions.list).not.toHaveBeenCalled();
    });
  });
});
