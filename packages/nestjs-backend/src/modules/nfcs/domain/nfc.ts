import { Exclude, Expose } from 'class-transformer';
import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';
import { NfcStatusEnum } from '../enums/nfc-statuses.enum';
import { TagStatusEnum } from '../enums/tag-statuses.enum';
import { User } from 'src/modules/users/domain/user';
import { EncryptionMode } from '../enums/encryption-mode.enum';

export class NFC {
  id: number | string;
  detail?: NfcDetail | null;
  uid: string;
  piccData: string;
  fileData: string;
  counter: number;
  status: NfcStatusEnum;
  tagStatus: TagStatusEnum;
  encryptionMode: EncryptionMode;

  @Exclude({ toPlainOnly: true })
  @Expose({ groups: ['me', 'admin'] })
  encryptedShareKey: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
  deletedBy?: User | null;
}
