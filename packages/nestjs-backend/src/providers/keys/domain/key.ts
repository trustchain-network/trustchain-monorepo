export class Key {
  id: number | string;
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
