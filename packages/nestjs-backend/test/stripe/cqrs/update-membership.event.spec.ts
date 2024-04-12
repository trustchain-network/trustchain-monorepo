import { MembershipFactoryService } from '#test/factory/membership.factory.service';
import { RoleFactoryService } from '#test/factory/role.factory.service';
import { UserFactoryService } from '#test/factory/user.factory.service';
import { TestModule } from '#test/utils/test.module';
import { Test, TestingModule } from '@nestjs/testing';
import { Membership } from 'src/modules/membership/entities/membership.entity';
import { MembershipTier } from 'src/modules/membership/enums/membership-tier.enum';
import { MembershipsModule } from 'src/modules/membership/memberships.module';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import {
  UpdateMembershipEvent,
  UpdateMembershipEventHandler,
} from 'src/providers/stripe/cqrs/update-membership.event';
import { StripeModule } from 'src/providers/stripe/stripe.module';

describe('UpdateMembershipEventHandler (unit)', () => {
  let moduleRef: TestingModule;
  let roleFactory: RoleFactoryService;
  let userFactory: UserFactoryService;
  let membershipFactory: MembershipFactoryService;

  let handler: UpdateMembershipEventHandler;

  let user: UserEntity;
  let membership: Membership;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [TestModule, StripeModule, MembershipsModule],
    }).compile();
    userFactory = moduleRef.get(UserFactoryService);
    roleFactory = moduleRef.get(RoleFactoryService);
    membershipFactory = moduleRef.get(MembershipFactoryService);

    handler = moduleRef.get(UpdateMembershipEventHandler);

    await membershipFactory.clearTable();
    await userFactory.clearTable();
    await roleFactory.setup();
  });

  beforeEach(async () => {
    user = await userFactory.create({ role: { id: RoleEnum.user } });
    membership = await membershipFactory.create({
      customerId: 'cus_id',
      userId: user.id,
      tier: null,
    });
  });

  afterEach(async () => {
    await membershipFactory.clearTable();
    await userFactory.clearTable();
  });

  afterAll(async () => {
    await roleFactory.clearTable();
    await moduleRef.close();
  });

  it('Should update role and update mebership data', async () => {
    const data = {
      customerId: 'cus_id',
      status: 'active',
      subscriptionId: 'sub_id',
      productId: 'prod_id',
      priceId: 'price_id',
      tier: MembershipTier.LITE,
    } as const;

    await handler.handle(
      new UpdateMembershipEvent({
        ...data,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(),
      }),
    );

    await Promise.all([membership.reload(), user.reload()]);

    expect(user).toEqual(
      expect.objectContaining({
        id: user.id,
        roleId: RoleEnum.member,
      }),
    );

    expect(membership).toEqual(
      expect.objectContaining({
        ...data,
        userId: user.id,
      }),
    );
  });
});
