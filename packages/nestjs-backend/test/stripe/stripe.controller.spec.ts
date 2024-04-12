import { MembershipFactoryService } from '#test/factory/membership.factory.service';
import { RoleFactoryService } from '#test/factory/role.factory.service';
import {
  TAuthData,
  UserFactoryService,
} from '#test/factory/user.factory.service';
import { StripeMock } from '#test/utils/stripe.mock';
import TestApp from '#test/utils/test-app';
import { EventBus } from '@nestjs/cqrs';
import { MembershipTier } from 'src/modules/membership/enums/membership-tier.enum';
import { MembershipsModule } from 'src/modules/membership/memberships.module';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { User } from 'src/modules/users/domain/user';
import { UpdateMembershipEvent } from 'src/providers/stripe/cqrs/update-membership.event';
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

  let spyEventBus: jest.SpyInstance;

  beforeAll(async () => {
    testApp = await TestApp.init({
      testingModules: [StripeModule, MembershipsModule],
      stripeMock: new StripeMock(),
    });
    userFactory = testApp.app.get(UserFactoryService);
    roleFactory = testApp.app.get(RoleFactoryService);
    membershipFactory = testApp.app.get(MembershipFactoryService);

    stripeMock = testApp.app.get<StripeMock>(stripeProvisionToken);

    spyEventBus = jest.spyOn(testApp.app.get(EventBus), 'publish');
    spyEventBus.mockImplementation();

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
        .expect(200);

      expect(body).toEqual([]);

      expect(stripeMock.subscriptions.list).not.toHaveBeenCalled();
    });

    it('FAIL 401. Unauthorized', async () => {
      await testApp.httpClient().get('/stripe/subscriptions').expect(401);

      expect(stripeMock.subscriptions.list).not.toHaveBeenCalled();
    });
  });

  describe('Stripe webhook: /stripe/events-webhook (POST)', () => {
    it('OK 204. Emmited valid event. Mapped stripe data correctly', async () => {
      const period = Date.now() / 1000;
      await testApp
        .httpClient()
        .post('/stripe/events-webhook')
        .send({
          type: 'customer.subscription.updated',
          data: {
            object: {
              id: 'sub_id',
              customer: 'cus_id',
              current_period_start: period,
              current_period_end: period,
              status: 'active',
              plan: {
                id: 'price_id',
                product: 'prod_id',
                metadata: { tier: 'LITE' },
              },
            },
          },
        })
        .expect(204);

      const date = new Date(period * 1000);
      expect(spyEventBus).toHaveBeenCalledTimes(1);
      expect(spyEventBus).toHaveBeenCalledWith(
        new UpdateMembershipEvent({
          customerId: 'cus_id',
          status: 'active',
          subscriptionId: 'sub_id',
          productId: 'prod_id',
          priceId: 'price_id',
          tier: MembershipTier.LITE,
          currentPeriodStart: date,
          currentPeriodEnd: date,
        }),
      );
    });
  });
});
