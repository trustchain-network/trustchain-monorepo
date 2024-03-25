export type Plan = {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration?: number;
  durationType?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  updatedBy?: string;
  createdBy?: string;
  deletedBy?: string;
};
