import { User } from 'src/modules/users/domain/user';
import { Key } from 'src/providers/keys/domain/key';

export class NfcGroup {
  id: string;
  name: string;
  description?: string | null;
  publicKey: string | null;
  privateKey?: Key | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
  deletedBy?: User | null;
}
