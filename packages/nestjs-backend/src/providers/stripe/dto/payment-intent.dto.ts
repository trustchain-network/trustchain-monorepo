import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentIntentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
