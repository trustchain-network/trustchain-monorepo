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
import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { IcTypeEnum } from 'src/modules/nfc-details/enums/ic-types.enum';

@Entity({
  name: 'nfcDetail',
})
export class NfcDetailEntity
  extends EntityRelationalHelper
  implements NfcDetail
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: true })
  icManifacturer?: string | null;

  @Column({
    type: 'enum',
    enum: IcTypeEnum,
    nullable: true,
    default: IcTypeEnum.NTAG,
  })
  icType?: IcTypeEnum;

  @Column({ type: String, nullable: true })
  memoryInfo?: string | null;

  @Column({ type: 'jsonb' })
  technologies?: string[] | null;

  @Column({ type: String, nullable: true })
  majorVersion?: string | null;

  @Column({ type: String, nullable: true })
  minorVersion?: string | null;

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
