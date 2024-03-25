import { Key } from 'src/providers/keys/domain/key';

export class NfcGroup {
  id: number | string;
  name: string;
  description?: string | null;
  publicKey: string | null;
  privateKey?: Key | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
