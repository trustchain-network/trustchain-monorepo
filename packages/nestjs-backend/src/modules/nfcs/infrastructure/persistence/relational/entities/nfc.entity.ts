import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { EncryptionMode } from 'src/modules/nfcs/enums/encryption-mode.enum';
import { NfcStatusEnum } from 'src/modules/nfcs/enums/nfc-statuses.enum';
import { TagStatusEnum } from 'src/modules/nfcs/enums/tag-statuses.enum';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { NfcDetailEntity } from 'src/modules/nfc-details/infrastructure/persistence/relational/entities/nfc-detail.entity';

@Entity({
  name: 'nfc',
})
export class NfcEntity extends EntityRelationalHelper implements NFC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => NfcDetailEntity, {
    eager: true,
  })
  detail?: NfcDetailEntity | null;

  @Column({ type: String, nullable: false })
  uid: string;

  @Column({ type: String, nullable: false })
  piccData: string;

  @Column({ type: String, nullable: true })
  fileData: string | null;

  @Column()
  counter: number;

  @Column({
    type: 'enum',
    enum: NfcStatusEnum,
    nullable: false,
    default: NfcStatusEnum.ACTIVE,
  })
  status: NfcStatusEnum;

  @Column({
    type: 'enum',
    enum: TagStatusEnum,
    nullable: false,
    default: TagStatusEnum.BLANK,
  })
  tagStatus: TagStatusEnum;

  @Column({
    type: 'enum',
    enum: EncryptionMode,
    default: EncryptionMode.AES,
  })
  encryptionMode: EncryptionMode;

  @Column({ type: String, nullable: false })
  @Expose({ groups: ['admin'] })
  encryptedShareKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  createdBy?: UserEntity | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  updatedBy?: UserEntity | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  deletedBy?: UserEntity | null;
}
