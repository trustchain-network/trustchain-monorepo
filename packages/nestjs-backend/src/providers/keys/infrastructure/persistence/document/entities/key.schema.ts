import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type KeySchemaDocument = HydratedDocument<KeySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class KeySchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    unique: true,
  })
  id: string;

  @Prop({
    type: String,
    unique: true,
  })
  @Expose({ groups: ['me', 'admin'], toPlainOnly: true })
  key: string;

  @Prop({
    type: String,
    default: null,
  })
  publicKey?: string | null;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  // @Prop()
  // createdBy?: string | null;

  // @Prop()
  // updatedBy?: string | null;

  // @Prop()
  // deletedBy?: string | null;
}

export const KeySchema = SchemaFactory.createForClass(KeySchemaClass);
