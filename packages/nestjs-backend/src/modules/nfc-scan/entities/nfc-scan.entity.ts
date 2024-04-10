import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcEntity } from 'src/modules/nfcs/infrastructure/persistence/relational/entities/nfc.entity';
import { EntityRelationalHelper } from 'src/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface INfcScan {
  id: number;
  nfc?: NFC | null;
  nfcId: string | null;
  createdAt: Date;
}

@Entity({
  name: 'nfcScan',
})
export class NfcScan extends EntityRelationalHelper implements INfcScan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NfcEntity, (nfc) => nfc, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'nfcId' })
  nfc?: NfcEntity | null;

  @Column({ nullable: true })
  nfcId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
