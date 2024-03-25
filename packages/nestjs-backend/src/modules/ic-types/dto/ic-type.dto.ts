import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IcType } from '../domain/ic-types';

export class IcTypeDto implements IcType {
  @ApiProperty()
  @IsNumber()
  id: number;
}
