import { User } from 'src/modules/users/domain/user';

export class Session {
  id: number | string;
  user: User;
  createdAt: Date;
  deletedAt: Date;
}
