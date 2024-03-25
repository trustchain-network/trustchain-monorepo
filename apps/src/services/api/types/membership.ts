import { Plan } from './plan';
import { User } from './user';

export type Membership = {
  id: number | string;
  user: User;
  plan: Plan;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
