import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

export const stripeProvisionToken = Symbol('STRIPE');

export const stripeProvider = {
  provide: stripeProvisionToken,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const secretKey = config.get<string>('stripe.secretKey', { infer: true });
    if (!secretKey) {
      return;
    }

    return new Stripe(secretKey);
  },
};
