import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { ApiKey } from 'src/modules/api-keys/domain/api-key';

@Entity({
  name: 'apiKey',
})
export class ApiKeyEntity extends EntityRelationalHelper implements ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: String, nullable: true })
  name: string | null;

  @Column({ type: String, nullable: true })
  description?: string | null;

  @Column({ type: 'simple-array', nullable: true })
  scopes?: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  ipAllowlist?: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  ipRestrictions?: string[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: String, nullable: true })
  updatedBy?: string | null;

  @Column({ type: String, nullable: true })
  createdBy?: string | null;

  @Column({ type: String, nullable: true })
  deletedBy?: string | null;
}
