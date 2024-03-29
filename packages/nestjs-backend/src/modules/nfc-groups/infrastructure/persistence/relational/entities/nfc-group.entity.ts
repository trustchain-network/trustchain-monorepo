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
import { User } from 'src/modules/users/domain/user';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { KeyEntity } from 'src/providers/keys/infrastructure/persistence/relational/entities/key.entity';
import { Expose } from 'class-transformer';

@Entity({
  name: 'nfc-group',
})
export class NfcGroupEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: true })
  description?: string | null;

  @Column({ type: String, nullable: true })
  publicKey: string | null;

  @Expose({ groups: ['me', 'admin'] })
  @ManyToOne(() => KeyEntity, {
    eager: true,
  })
  privateKey?: KeyEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  createdBy?: User | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  updatedBy?: User | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  deletedBy?: User | null;
}
