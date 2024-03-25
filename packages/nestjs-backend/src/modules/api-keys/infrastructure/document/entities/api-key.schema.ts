import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type ApiKeySchemaDocument = HydratedDocument<ApiKeySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ApiKeySchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  id: number;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop()
  description?: string;

  @Expose()
  @Prop()
  scopes?: string[];

  @Expose()
  @Prop()
  ipAllowlist?: string[];

  @Expose()
  @Prop()
  ipRestrictions?: string[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKeySchemaClass);
