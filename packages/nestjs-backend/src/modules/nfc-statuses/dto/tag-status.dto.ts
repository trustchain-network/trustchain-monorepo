import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TagStatus } from '../domain/tag-status';

export class TagStatusDto implements TagStatus {
  @ApiProperty()
  @IsNumber()
  id: number;
}
