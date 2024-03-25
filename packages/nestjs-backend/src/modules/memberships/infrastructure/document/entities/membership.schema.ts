import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type MembershipSchemaDocument = HydratedDocument<MembershipSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class MembershipSchemaClass extends EntityDocumentHelper {
  @Expose()
  @Prop({ required: true })
  status: string;

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

export const MembershipSchema = SchemaFactory.createForClass(
  MembershipSchemaClass,
);
