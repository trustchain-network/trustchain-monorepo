import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EncryptionMode } from '../domain/nfc';
import { NfcStatusDto } from 'src/modules/nfc-statuses/dto/nfc-status.dto';
import { Type } from 'class-transformer';
import { User } from 'src/modules/users/domain/user';
import { TagStatusDto } from 'src/modules/nfc-statuses/dto/tag-status.dto';

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

  @ApiProperty({ type: NfcStatusDto })
  @IsNotEmpty()
  @Type(() => NfcStatusDto)
  status: NfcStatusDto;

  @ApiProperty({ type: TagStatusDto })
  @IsNotEmpty()
  @Type(() => TagStatusDto)
  tagStatus: TagStatusDto;

  @ApiProperty()
  @IsNotEmpty()
  encryptionMode: EncryptionMode;

  @ApiProperty()
  @IsNotEmpty()
  encryptedShareKey: string;

  createdBy?: User | null;
  updatedBy?: User | null;
}
