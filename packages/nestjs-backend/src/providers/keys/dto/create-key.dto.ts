import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsOptional()
  publicKey: string;
}
