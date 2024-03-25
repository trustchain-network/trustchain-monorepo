import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsNumber()
  amount: number;

  @IsString()
  stripeCustomerId: string;
}

export default CreateChargeDto;
