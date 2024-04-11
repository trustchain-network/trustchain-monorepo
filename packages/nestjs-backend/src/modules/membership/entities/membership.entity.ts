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
import { MembershipTier } from '../enums/membership-tier.enum';

@Entity()
export class Membership extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  customerId?: string | null;

  @Column({ type: String, nullable: true })
  status?: Stripe.Subscription.Status | null;

  @Column({ type: String, nullable: true })
  subscriptionId?: string;

  @Column({ type: String, nullable: true })
  productId?: string | null;

  @Column({ type: String, nullable: true })
  priceId?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  currentPeriodStart?: Date;

  @Column({ type: 'timestamp', nullable: true })
  currentPeriodEnd?: Date;

  @OneToOne(() => UserEntity, (user) => user.membership)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;

  @Column({ type: String, nullable: true })
  tier?: MembershipTier | null;

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
