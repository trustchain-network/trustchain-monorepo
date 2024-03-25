import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Membership } from 'src/modules/memberships/domain/membership';

@Entity({
  name: 'membership',
})
export class MembershipEntity
  extends EntityRelationalHelper
  implements Membership
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

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
