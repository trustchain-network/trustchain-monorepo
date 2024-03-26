import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { EncryptionMode, NFC } from 'src/modules/nfcs/domain/nfc';
import { Expose } from 'class-transformer';
import { NfcStatusEntity } from 'src/modules/nfc-statuses/infrastructure/persistence/relational/entities/nfc-status.entity';
import { TagStatusEntity } from 'src/modules/nfc-statuses/infrastructure/persistence/relational/entities/tag-status.entity';
import { User } from 'src/modules/users/domain/user';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { NfcStatusEnum } from 'src/modules/nfc-statuses/nfc-statuses.enum';
import { TagStatusEnum } from 'src/modules/nfc-statuses/tag-statuses.enum';
//import { NfcDetailEntity } from 'src/nfc-details/infrastructure/persistence/relational/entities/nfc-detail.entity';

@Entity({
  name: 'nfc',
})
export class NfcEntity extends EntityRelationalHelper implements NFC {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  uid: string;

  @Column({ type: String, nullable: false })
  nfcDetail: string;

  @Column({ type: String, nullable: false })
  piccData: string;

  @Column({ type: String, nullable: false })
  fileData: string;

  @Column()
  counter: number;

  @Column()
  status: NfcStatusEnum;

  @Column()
  tagStatus: TagStatusEnum;

  @Column()
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
