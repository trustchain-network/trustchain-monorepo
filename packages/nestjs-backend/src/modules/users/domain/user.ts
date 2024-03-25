import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/modules/files/domain/file';
import { Membership } from 'src/modules/memberships/domain/membership';
import { Role } from 'src/modules/roles/domain/role';
import { Status } from 'src/modules/statuses/domain/status';
import { TwoFactor } from 'src/modules/two-factor/domain/two-factor';

export class User {
  id: string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  role?: Role | null;
  status?: Status;
  countryCode?: string | null;

  twoFactor?: TwoFactor | null;
  @Expose({ groups: ['admin'] })
  twoFactorPhone?: string | null;
  @Expose({ groups: ['admin'] })
  twoFactorSecret?: string | null;

  membership?: Membership | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
}
