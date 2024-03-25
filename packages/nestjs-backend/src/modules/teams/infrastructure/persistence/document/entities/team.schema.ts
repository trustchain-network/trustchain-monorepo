import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { User } from 'src/modules/users/domain/user';

export type TeamSchemaDocument = HydratedDocument<TeamSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class TeamSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    unique: true,
  })
  id: string;

  @Prop({
    type: User,
    required: true,
  })
  user: User;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  @Expose({ groups: ['me', 'admin'], toPlainOnly: true })
  name: string;

  @Prop({ type: String })
  description?: string | null;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({
    type: User,
    required: true,
  })
  createdBy?: User | null;

  @Prop({
    type: User,
    required: true,
  })
  updatedBy?: User | null;
}

export const TeamSchema = SchemaFactory.createForClass(TeamSchemaClass);
