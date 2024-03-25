import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import Stripe from 'stripe';
// import { CreateStripeDto } from './dto/create-stripe.dto';
// import { UpdateStripeDto } from './dto/update-stripe.dto';

@Injectable()
export class StripeService {
  private logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
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
}
