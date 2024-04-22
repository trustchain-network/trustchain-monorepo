import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export interface IGenerateKeyPairInput {
  userId?: string;
  subscriptionId?: string;
}

export class GenerateKeyPairInputDto implements IGenerateKeyPairInput {
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subscriptionId?: string;
}
