import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.
import { Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type MultiFactorAuthenticationSchemaDocument =
  HydratedDocument<MultiFactorAuthenticationSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class MultiFactorAuthenticationSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    unique: true,
  })
  @Expose({ groups: ['me', 'admin'] })
  token: string | null;

  @Prop({
    type: String,
    unique: true,
  })
  @Expose({ groups: ['me', 'admin'] })
  phone: string | null;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const MultiFactorAuthenticationSchema = SchemaFactory.createForClass(
  MultiFactorAuthenticationSchemaClass,
);
