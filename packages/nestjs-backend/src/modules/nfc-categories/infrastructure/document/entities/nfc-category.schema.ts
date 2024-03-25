import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type NfcCategorySchemaDocument =
  HydratedDocument<NfcCategorySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class NfcCategorySchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    unique: true,
  })
  id: string;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop()
  description?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdBy?: string | null;

  @Prop()
  updatedBy?: string | null;

  @Prop()
  deletedBy?: string | null;
}

export const NfcCategorySchema = SchemaFactory.createForClass(
  NfcCategorySchemaClass,
);
