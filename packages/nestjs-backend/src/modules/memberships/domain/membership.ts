export class Membership {
  id: number | string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  updatedBy?: string | null;
  createdBy?: string | null;
  deletedBy?: string | null;
}
