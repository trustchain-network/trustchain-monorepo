import { Expose } from 'class-transformer';

export class MultiFactorAuthentication {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  token?: string;

  @Expose({ groups: ['me', 'admin'] })
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
