import { Exclude } from 'class-transformer';

export class Key {
  id: number | string;

  @Exclude({ toPlainOnly: true })
  key: string;

  publicKey?: string | null;
  subscriptionId?: string | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
