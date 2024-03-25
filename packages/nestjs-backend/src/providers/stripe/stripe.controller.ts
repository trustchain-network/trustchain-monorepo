import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  @HttpCode(HttpStatus.CREATED)
  async createCharge(@Body() charge: CreateChargeDto) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      charge.stripeCustomerId,
    );
  }
}
