import { Expose } from 'class-transformer';
import { User } from 'src/modules/users/domain/user';

export class Team {
  id: string;
  user?: User | null;
  @Expose({ groups: ['me', 'admin'] })
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
}
