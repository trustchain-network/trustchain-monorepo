import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from 'src/modules/users/domain/user';

export class CreatePlanDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  @IsOptional()
  duration?: number;

  @ApiProperty()
  @IsOptional()
  durationType?: string;

  createdBy: User | null;
  updatedBy: User | null;
}
