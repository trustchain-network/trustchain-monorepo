import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { EncryptionMode } from 'src/modules/nfcs/domain/nfc';
import { NfcStatusEnum } from 'src/modules/nfc-statuses';
import { User } from 'src/modules/users/domain/user';

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

  @Prop()
  nfcDetail: string;

  @Prop({ required: true })
  piccData: string;

  @Prop({ required: true })
  fileData: string;

  @Prop({ required: true })
  counter: number;

  @Prop({ required: true })
  status: NfcStatusEnum;

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

  createdBy?: User | null;
  updatedBy?: User | null;
  deletedBy?: User | null;
}

export const NfcSchema = SchemaFactory.createForClass(NfcSchemaClass);
