import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { stripeProvider, stripeProvisionToken } from './stripe.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { MembershipsModule } from 'src/modules/membership/memberships.module';
import { UpdateMembershipEventHandler } from './cqrs/update-membership.event';

@Module({
  controllers: [StripeController],
  imports: [CqrsModule, UsersModule, MembershipsModule],
  providers: [StripeService, stripeProvider, UpdateMembershipEventHandler],
  exports: [StripeService, stripeProvisionToken],
})
export class StripeModule {}
