import { BaseFactoryService } from './base.factory.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from 'src/modules/membership/entities/membership.entity';
import { faker } from '@faker-js/faker';
import { MembershipTier } from 'src/modules/membership/enums/membership-tier.enum';

const stripeId = (prefix: string): string =>
  `${prefix}_${faker.string.alphanumeric({ length: { min: 14, max: 24 } })}`;

export class MembershipFactoryService extends BaseFactoryService<Membership> {
  constructor(
    @InjectRepository(Membership)
    protected repository: Repository<Membership>,
  ) {
    super();
  }

  protected buildEntity(data?: Partial<Membership>) {
    const start = new Date();

    return this.repository.create({
      customerId: stripeId('cus'),
      status: 'active',
      subscriptionId: stripeId('sub'),
      productId: stripeId('prod'),
      priceId: stripeId('price'),
      currentPeriodStart: start,
      currentPeriodEnd: new Date(
        new Date(start).setMonth(start.getMonth() + 1),
      ),
      tier: MembershipTier.LITE,
      ...(data ?? {}),
    });
  }
}
