import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNfcDto } from './create-nfc.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { EncryptionMode } from '../enums/encryption-mode.enum';
import { TagStatusEnum } from '../enums/tag-statuses.enum';
import { NfcStatusEnum } from '../enums/nfc-statuses.enum';
import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';
import { User } from 'src/modules/users/domain/user';

export class UpdateNfcDto extends PartialType(CreateNfcDto) {
  @ApiProperty()
  @IsOptional()
  detailId?: NfcDetail | null;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  nfcDetail: string;

  @ApiProperty()
  piccData: string;

  @ApiProperty()
  fileData: string;

  @ApiProperty()
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

  updatedBy?: User | null;
}
