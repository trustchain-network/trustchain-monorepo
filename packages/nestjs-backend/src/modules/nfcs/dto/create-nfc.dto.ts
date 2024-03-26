import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EncryptionMode } from '../domain/nfc';
import { User } from 'src/modules/users/domain/user';
import { NfcStatusEnum, TagStatusEnum } from 'src/modules/nfc-statuses';

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

  @ApiProperty({ type: NfcStatusEnum })
  @IsNotEmpty()
  status: NfcStatusEnum;

  @ApiProperty({ type: TagStatusEnum })
  @IsNotEmpty()
  tagStatus: TagStatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  encryptionMode: EncryptionMode;

  @ApiProperty()
  @IsNotEmpty()
  encryptedShareKey: string;

  createdBy?: User | null;
  updatedBy?: User | null;
}
