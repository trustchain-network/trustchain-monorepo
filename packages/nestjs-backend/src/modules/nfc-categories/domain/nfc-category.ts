export class NfcCategory {
  id: number | string;

  name: string;
  description?: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
