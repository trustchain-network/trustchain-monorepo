import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  controllers: [StripeController],
  imports: [UsersModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
