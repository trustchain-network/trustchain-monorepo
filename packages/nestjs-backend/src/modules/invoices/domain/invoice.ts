import { Membership } from 'src/modules/memberships/domain/membership';
import { Plan } from 'src/modules/plans/domain/plan';

export class Invoice {
  id: number | string;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  customerId: Membership;
  invoiceItem: Plan;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
