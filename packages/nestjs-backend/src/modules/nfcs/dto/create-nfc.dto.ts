import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EncryptionMode } from '../domain/nfc';

export class CreateNfcDto {
  @ApiProperty()
  @IsNotEmpty()
  uid: string;

  @ApiProperty()
  @IsNotEmpty()
  nfcDetail: string;

  @ApiProperty()
  @IsNotEmpty()
  piccData: string;

  @ApiProperty()
  @IsNotEmpty()
  fileData: string;

  @ApiProperty()
  @IsNotEmpty()
  counter: number;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  encryptionMode: EncryptionMode;

  @ApiProperty()
  @IsNotEmpty()
  encryptedShareKey: string;

  createdBy?: string | null;
  updatedBy?: string | null;
}
