import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  SerializeOptions,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RoleEnum } from 'src/modules/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/roles/roles.guard';
import CreateChargeDto from './dto/create-charge.dto';
import { PaymentIntentDto } from './dto/payment-intent.dto';
import { UserDecorator } from 'src/modules/users/user.decorator';
import Stripe from 'stripe';
import { StripeEventDto } from './dto/stripe-event.dto';
import { StripeSignatureGuard } from './guards/stripe-signature.guard';

@ApiBearerAuth()
@ApiTags('Stripe')
@Controller({
  path: 'stripe',
  version: '1',
})
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async createCharge(@Body() charge: CreateChargeDto) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      charge.stripeCustomerId,
    );
  }

  @Get('products')
  @HttpCode(HttpStatus.OK)
  productList(): Promise<Stripe.Product[]> {
    return this.stripeService.productList();
  }

  @Get('subscriptions')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  subscriptionList(
    @UserDecorator('id') userId: string,
  ): Promise<Stripe.Subscription[]> {
    return this.stripeService.subscriptionList(userId);
  }

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async checkout(
    @Body() { productId }: PaymentIntentDto,
    @UserDecorator('id') userId: string,
  ): Promise<Pick<Stripe.Checkout.Session, 'url'>> {
    const { url } = await this.stripeService.subscribe(productId, userId);

    return { url };
  }

  @Post('events-webhook')
  @UseGuards(StripeSignatureGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  eventsWebhook(@Body() { data, type }: StripeEventDto): void {
    this.stripeService.handleEvent(type, data);
  }
}
