import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

import { Plan } from 'src/modules/plans/domain/plan';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'plan',
})
export class PlanEntity extends EntityRelationalHelper implements Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('double precision', { nullable: false })
  price: number;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  durationType?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  updatedBy?: UserEntity | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  createdBy?: UserEntity | null;
}
