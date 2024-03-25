import { User } from 'src/modules/users/domain/user';

export class Plan {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration?: number;
  durationType?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: User | null;
  updatedBy?: User | null;
}
