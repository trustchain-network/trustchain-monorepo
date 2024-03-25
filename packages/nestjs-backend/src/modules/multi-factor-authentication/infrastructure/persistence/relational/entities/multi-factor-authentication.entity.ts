import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';

@Entity({
  name: 'mfa',
})
export class MultiFactorAuthenticationEntity
  extends EntityRelationalHelper
  implements MultiFactorAuthentication
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  token: string;

  @Column({ type: String, unique: true, nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: String, nullable: true })
  createdBy?: string | null;

  @Column({ type: String, nullable: true })
  updatedBy?: string | null;

  @Column({ type: String, nullable: true })
  deletedBy?: string | null;
}
