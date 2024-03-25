export type NfcCategory = {
  id: number | string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number | string;
  updatedBy: number | string;
  deletedBy: number | string;
};
