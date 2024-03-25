import { Exclude, Expose } from 'class-transformer';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';

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
  status: string;
  encryptionMode: EncryptionMode;

  @Exclude({ toPlainOnly: true })
  @Expose({ groups: ['me', 'admin'] })
  encryptedShareKey: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
