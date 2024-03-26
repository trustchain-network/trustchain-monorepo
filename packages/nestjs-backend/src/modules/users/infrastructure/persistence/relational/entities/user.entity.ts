// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthProvidersEnum } from 'src/modules/auth/auth-providers.enum';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { FileEntity } from 'src/modules/files/infrastructure/persistence/relational/entities/file.entity';
import { MembershipEntity } from 'src/modules/memberships/infrastructure/persistence/relational/entities/membership.entity';
import { RoleEntity } from 'src/modules/roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from 'src/modules/statuses/infrastructure/persistence/relational/entities/status.entity';
import { TwoFactor } from 'src/modules/two-factor/domain/two-factor';
import { User } from 'src/modules/users/domain/user';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @Column({ type: String, nullable: true })
  countryCode?: string | null;

  @Column({ type: String, nullable: true })
  twoFactor?: TwoFactor | null;

  @Column({ type: String, nullable: true })
  twoFactorPhone?: string | null;

  @Column({ type: String, nullable: true })
  twoFactorSecret?: string | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @ManyToOne(() => MembershipEntity, {
    eager: true,
  })
  membership?: MembershipEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity)
  createdBy?: UserEntity | null;

  @ManyToOne(() => UserEntity)
  updatedBy?: UserEntity | null;

  @ManyToOne(() => UserEntity)
  deletedBy?: UserEntity | null;
}
