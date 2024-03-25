import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from 'src/modules/users/domain/user';

export class UpdatePlanDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  currency: string;

  @ApiProperty()
  @IsOptional()
  duration?: number;

  @ApiProperty()
  @IsOptional()
  durationType?: string;

  updatedBy?: User | null;
}
