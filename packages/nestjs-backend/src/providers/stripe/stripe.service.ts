import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { UsersService } from 'src/modules/users/users.service';
import Stripe from 'stripe';
// import { CreateStripeDto } from './dto/create-stripe.dto';
// import { UpdateStripeDto } from './dto/update-stripe.dto';

@Injectable()
export class StripeService {
  private logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly usersService: UsersService,
  ) {
    const secretKey = this.configService.getOrThrow<string>(
      'stripe.secretKey',
      { infer: true },
    );
    if (!secretKey) {
      this.logger.error('StripeService config is not set');
    }
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });
    if (!this.stripe) {
      this.logger.error('StripeService is not ready');
    }
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
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

  public async subscribe(
    productId: string,
    userId: string,
  ): Promise<Stripe.Checkout.Session> {
    const user = await this.usersService.findOneOrFail({ id: userId });
    if (!user.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { user: { email: 'noEmail' } },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // TODO: Add existing customer id
    const { id: customerId } = await this.stripe.customers.create({
      email: user.email,
    });

    const product = await this.stripe.products.retrieve(productId, {
      expand: ['default_price'],
    });
    const { id: priceId } = product.default_price as Stripe.Price;

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      allow_promotion_codes: true,
      line_items: [{ quantity: 1, price: priceId }],
    });

    // TODO: Add user db update

    return session;
  }

  public async productList(): Promise<Stripe.Product[]> {
    const { data } = await this.stripe.products.list();

    return data;
  }
}
