import { Stripe } from 'stripe';
import { IsOptional } from 'class-validator';

export class StripeEventDto implements Partial<Stripe.EventBase> {
  @IsOptional()
  type: Stripe.Event.Type;

  @IsOptional()
  data: Stripe.Event.Data;
}
