import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { stripeProvisionToken } from '../stripe.provider';

@Injectable()
export class StripeSignatureGuard implements CanActivate {
  constructor(
    @Inject(stripeProvisionToken)
    private readonly stripe: Stripe,
    private readonly config: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const secret = this.config.get<string>('stripe.webhookSecret');
    if (!secret) {
      return false;
    }

    const request = ctx.switchToHttp().getRequest();
    try {
      this.stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers['stripe-signature'],
        secret,
      );
    } catch (err) {
      return false;
    }

    return true;
  }
}
