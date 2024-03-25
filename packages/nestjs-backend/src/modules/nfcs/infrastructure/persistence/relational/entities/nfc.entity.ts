import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { EncryptionMode, NFC } from 'src/modules/nfcs/domain/nfc';
import { Expose } from 'class-transformer';
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

  @Column({ type: String, nullable: false })
  status: string;

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

  @Column({ type: String, nullable: true })
  createdBy?: string | null;

  @Column({ type: String, nullable: true })
  updatedBy?: string | null;

  @Column({ type: String, nullable: true })
  deletedBy?: string | null;
}
