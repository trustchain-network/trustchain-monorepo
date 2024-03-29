import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MembershipService } from 'src/modules/membership/membership.service';
import Stripe from 'stripe';

export type TUpdateMembershipInput = {
  customerId: string;
  status?: Stripe.Subscription.Status;

  subscriptionId?: string;
  productId?: string;
  priceId?: string;

  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
};

export class UpdateMembershipEvent implements IEvent {
  constructor(readonly payload: TUpdateMembershipInput) {}
}

@EventsHandler(UpdateMembershipEvent)
export class UpdateMembershipEventHandler
  implements IEventHandler<UpdateMembershipEvent>
{
  constructor(private readonly membershipService: MembershipService) {}

  async handle({ payload }: UpdateMembershipEvent): Promise<void> {
    const membership = await this.membershipService.findOneOrFail({
      customerId: payload.customerId,
    });

    await this.membershipService.update(membership.id, payload);
  }
}
