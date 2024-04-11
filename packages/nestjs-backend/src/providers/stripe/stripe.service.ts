import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { UsersService } from 'src/modules/users/users.service';
import Stripe from 'stripe';
import { stripeProvisionToken } from './stripe.provider';
import { User } from 'src/modules/users/domain/user';
import { EventBus } from '@nestjs/cqrs';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { UpdateMembershipEvent } from './cqrs/update-membership.event';
import { MembershipService } from 'src/modules/membership/membership.service';
import { UnprocessableEntityError } from 'src/utils/errors';

@Injectable()
export class StripeService {
  constructor(
    @Inject(stripeProvisionToken)
    private readonly stripe: Stripe,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly eventBus: EventBus,
    private readonly usersService: UsersService,
    private readonly membershipService: MembershipService,
  ) {}

  async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.getOrThrow<string>('stripe.currency', {
        infer: true,
      }),
      confirm: true,
    });
  }

  async subscribe(
    productId: string,
    userId: string,
  ): Promise<Stripe.Checkout.Session> {
    const user = await this.usersService.findOneOrFail({ id: userId });
    if (!user?.email) {
      throw new UnprocessableEntityError({ user: { email: 'noEmail' } });
    }

    const customerId = await this.getOrCreateCustomerId(user);

    const product = await this.stripe.products.retrieve(productId, {
      expand: ['default_price'],
    });
    const { id: priceId } = product.default_price as Stripe.Price;

    const url = `${this.configService.get<string>('app.frontendDomain', { infer: true })}/settings/account/billing`;
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      allow_promotion_codes: true,
      line_items: [{ quantity: 1, price: priceId }],
      success_url: url,
      cancel_url: url,
    });

    return session;
  }

  async productList(): Promise<Stripe.Product[]> {
    const { data } = await this.stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    return data;
  }

  async subscriptionList(userId: string): Promise<Stripe.Subscription[]> {
    const membership = await this.membershipService
      .findOneOrFail({ userId })
      .catch(() => null);

    if (!membership?.customerId) {
      return [];
    }

    const { data } = await this.stripe.subscriptions.list({
      customer: membership.customerId,
    });

    return data;
  }

  handleEvent(type: Stripe.Event.Type, data: Stripe.Event.Data): void {
    if (type === 'customer.subscription.updated') {
      const {
        id: subscriptionId,
        customer,
        current_period_end,
        current_period_start,
        status,
      } = data.object as Stripe.Subscription;
      const { id: priceId, product } = (data.object as any).plan as Stripe.Plan;

      this.eventBus.publish(
        new UpdateMembershipEvent({
          customerId: customer as string,
          status,
          subscriptionId,
          productId: product as string,
          priceId,
          currentPeriodStart: new Date(current_period_start * 1000),
          currentPeriodEnd: new Date(current_period_end * 1000),
        }),
      );
    }
  }

  private async getOrCreateCustomerId(
    user: User | UserEntity,
  ): Promise<string> {
    const isCustomer = !!user.membership?.customerId;
    const customerPromise = isCustomer
      ? this.stripe.customers.retrieve(user?.membership?.customerId as string, {
          expand: ['subscriptions'],
        })
      : this.stripe.customers.create({
          email: user.email as string,
          name: `${user.firstName} ${user.lastName}`,
        });

    const { id: customerId } = await customerPromise;

    if (!isCustomer) {
      await this.membershipService.create({
        customerId,
        user: { id: user.id },
      });
    }

    return customerId;
  }
}
