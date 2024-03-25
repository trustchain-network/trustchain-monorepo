import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { User } from 'src/modules/users/domain/user';

export type PlanSchemaDocument = HydratedDocument<PlanSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PlanSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  id: number;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop()
  description?: string;

  @Expose()
  @Prop({ required: true })
  price: number;

  @Expose()
  @Prop({ required: true })
  currency: string;

  @Expose()
  @Prop()
  duration?: number;

  @Expose()
  @Prop()
  durationType?: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({
    type: User,
  })
  createdBy?: User | null;

  @Prop({
    type: User,
  })
  updatedBy?: User;
}

export const PlanSchema = SchemaFactory.createForClass(PlanSchemaClass);
