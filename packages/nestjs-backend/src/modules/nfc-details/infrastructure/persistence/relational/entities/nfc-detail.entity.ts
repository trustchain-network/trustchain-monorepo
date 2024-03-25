// import {
//   Column,
//   CreateDateColumn,
//   DeleteDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';
// import { IcType } from 'src/ic-types/domain/ic-types';

// @Entity({
//   name: 'nfcDetail',
// })
// export class NfcDetailEntity
//   extends EntityRelationalHelper
//   implements NfcDetail
// {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   icManifacturer?: string | null;

//   @ManyToOne(() => IcType, {
//     eager: true,
//   })
//   icType?: IcType | null;

//   @Column()
//   memoryInfo?: string | null;

//   @Column('simple-array')
//   technologies?: string[] | null;

//   @Column()
//   majorVersion?: string | null;

//   @Column()
//   minorVersion?: string | null;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;

//   @Column({ nullable: true })
//   createdBy?: number | string | null;

//   @Column({ nullable: true })
//   updatedBy?: number | string | null;

//   @Column({ nullable: true })
//   deletedBy?: number | string | null;
// }
