import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export interface ITagDataEncrypted {
  picc_data: string;
  enc?: string;
  cmac: string;
}

export class TagDataEncryptedDto implements ITagDataEncrypted {
  @ApiProperty()
  @IsString()
  picc_data: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  enc?: string;

  @ApiProperty()
  @IsString()
  cmac: string;
}
