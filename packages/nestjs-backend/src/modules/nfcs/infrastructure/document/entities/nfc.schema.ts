import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';
// import { OneToOne } from 'typeorm';
import { EncryptionMode } from 'src/modules/nfcs/domain/nfc';

export type NfcSchemaDocument = HydratedDocument<NfcSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class NfcSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  uid: string;

  // @Prop({ required: true })
  // @OneToOne(() => NfcDetail)
  @Prop()
  nfcDetail: string;

  @Prop({ required: true })
  piccData: string;

  @Prop({ required: true })
  fileData: string;

  @Prop({ required: true })
  counter: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  encryptionMode: EncryptionMode;

  @Prop({ required: true })
  encryptedShareKey: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}

export const NfcSchema = SchemaFactory.createForClass(NfcSchemaClass);
