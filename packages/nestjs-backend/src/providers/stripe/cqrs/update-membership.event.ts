import { EventBus, EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MembershipTier } from 'src/modules/membership/enums/membership-tier.enum';
import { MembershipService } from 'src/modules/membership/membership.service';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { UsersService } from 'src/modules/users/users.service';
import { DeploySmartContractEvent } from 'src/providers/mina/cqrs/deploy-smart-contract.event';
import Stripe from 'stripe';

export type TUpdateMembershipInput = {
  customerId: string;
  status?: Stripe.Subscription.Status;

  subscriptionId?: string;
  productId?: string;
  priceId?: string;
  tier?: MembershipTier;

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
  constructor(
    private readonly membershipService: MembershipService,
    private readonly usersService: UsersService,
    private readonly eventBus: EventBus,
  ) {}

  async handle({ payload }: UpdateMembershipEvent): Promise<void> {
    const membership = await this.membershipService
      .findOneOrFail({ customerId: payload.customerId }, { user: true })
      .catch(() => null);

    if (!membership) {
      return;
    }

    if (
      payload.status === 'active' &&
      payload.subscriptionId &&
      membership.userId
    ) {
      this.eventBus.publish(
        new DeploySmartContractEvent({
          userId: membership.userId,
          subscriptionId: payload.subscriptionId,
        }),
      );
    }

    const updatesPromise: Promise<any>[] = [
      this.membershipService.update(membership.id, payload),
    ];
    if (membership?.user?.roleId === RoleEnum.user) {
      updatesPromise.push(
        this.usersService.update(membership.userId, {
          role: { id: RoleEnum.member },
        }),
      );
    }

    await Promise.all(updatesPromise);
  }
}
