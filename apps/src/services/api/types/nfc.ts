import { NfcDetail } from './nfc-detail';

export enum EncryptionMode {
  AES = 'AES',
  LRP = 'LRP',
}

export type Nfc = {
  id: number | string;
  uid: string;
  nfcDetail: number | string;
  piccData: string;
  fileData: string;
  counter: number;
  status: string;
  encryptionMode: EncryptionMode;
  encryptedShareKey: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
