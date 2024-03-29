import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/modules/users/domain/user';

export class CreateNfcDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  publicKey: string | null;

  @ApiProperty()
  @IsOptional()
  privateKey?: string | null;

  createdBy?: User | null;
  updatedBy?: User | null;
}
