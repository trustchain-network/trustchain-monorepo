import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils';
import Stripe from 'stripe';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Membership extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  customerId?: string;

  @Column({ type: String, nullable: true })
  status?: Stripe.Subscription.Status;

  @Column({ type: String, nullable: true })
  subscriptionId?: string;

  @Column({ type: String, nullable: true })
  productId?: string;

  @Column({ type: String, nullable: true })
  priceId?: string;

  @Column({ type: 'timestamp', nullable: true })
  currentPeriodStart?: Date;

  @Column({ type: 'timestamp', nullable: true })
  currentPeriodEnd?: Date;

  @OneToOne(() => UserEntity, (user) => user.membership)
  @JoinColumn()
  user: UserEntity;

  get isActive(): boolean {
    return this.status === 'active';
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
