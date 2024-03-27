import { Exclude, Expose } from 'class-transformer';
import { NfcStatusEnum, TagStatusEnum } from 'src/modules/nfc-statuses';
import { User } from 'src/modules/users/domain/user';

export enum EncryptionMode {
  AES = 'AES',
  LRP = 'LRP',
}

export class NFC {
  id: number | string;
  uid: string;
  nfcDetail: string;
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
