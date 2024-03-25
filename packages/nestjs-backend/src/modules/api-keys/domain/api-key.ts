export class ApiKey {
  id: number | string;

  name?: string | null;

  description?: string | null;

  scopes?: string[] | null;

  ipAllowlist?: string[] | null;

  ipRestrictions?: string[] | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
