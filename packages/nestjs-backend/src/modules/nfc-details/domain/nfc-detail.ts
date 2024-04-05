import { User } from 'src/modules/users/domain/user';
import { IcTypeEnum } from '../enums/ic-types.enum';

export class NfcDetail {
  id: string;
  icManifacturer?: string | null;
  icType?: IcTypeEnum;
  memoryInfo?: string | null;
  technologies?: string[] | null;
  majorVersion?: string | null;
  minorVersion?: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
  deletedBy?: User | null;
}
