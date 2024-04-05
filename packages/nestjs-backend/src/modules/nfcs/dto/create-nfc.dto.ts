import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EncryptionMode } from '../enums/encryption-mode.enum';
import { NfcStatusEnum } from '../enums/nfc-statuses.enum';
import { TagStatusEnum } from '../enums/tag-statuses.enum';
import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';
import { User } from 'src/modules/users/domain/user';

export class CreateNfcDto {
  @ApiProperty()
  @IsOptional()
  detailId?: NfcDetail | null;

  @ApiProperty()
  @IsNotEmpty()
  uid: string;

  @ApiProperty()
  @IsNotEmpty()
  piccData: string;

  @ApiProperty()
  @IsNotEmpty()
  fileData: string;

  @ApiProperty()
  @IsNotEmpty()
  counter: number;

  @ApiProperty({ enum: NfcStatusEnum })
  @IsNotEmpty()
  status: NfcStatusEnum;

  @ApiProperty({ enum: TagStatusEnum })
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
