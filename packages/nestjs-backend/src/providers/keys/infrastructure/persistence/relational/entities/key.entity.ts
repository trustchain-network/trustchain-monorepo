import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Key } from 'src/providers/keys/domain/key';

@Entity({
  name: 'key',
})
export class KeyEntity extends EntityRelationalHelper implements Key {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({ groups: ['me', 'admin'] })
  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  key: string;

  @Column({ type: String, nullable: true })
  publicKey?: string | null;

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
