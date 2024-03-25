import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TwoFactor } from '../domain/two-factor';

export class TwoFactorDto implements TwoFactor {
  @ApiProperty()
  @IsNumber()
  id: number;
}
