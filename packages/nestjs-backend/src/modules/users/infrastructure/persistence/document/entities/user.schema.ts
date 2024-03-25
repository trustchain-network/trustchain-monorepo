import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { now, HydratedDocument } from 'mongoose';
import { Role } from 'src/modules/roles/domain/role';
import { Status } from 'src/modules/statuses/domain/status';
import { AuthProvidersEnum } from 'src/modules/auth/auth-providers.enum';
// We use class-transformer in schema and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an schema entity directly in response.
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';
import { FileSchemaClass } from 'src/modules/files/infrastructure/persistence/document/entities/file.schema';
import { Membership } from 'src/modules/memberships/domain/membership';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
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
  email: string | null;

  @Exclude({ toPlainOnly: true })
  @Prop()
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'], toPlainOnly: true })
  @Prop({
    default: AuthProvidersEnum.email,
  })
  provider: string;

  @Expose({ groups: ['me', 'admin'], toPlainOnly: true })
  @Prop({
    type: String,
    default: null,
  })
  socialId?: string | null;

  @Prop({
    type: String,
  })
  firstName: string | null;

  @Prop({
    type: String,
  })
  lastName: string | null;

  @Prop({
    type: FileSchemaClass,
  })
  @Type(() => FileSchemaClass)
  photo?: FileSchemaClass | null;

  @Prop({
    type: Role,
  })
  role?: Role | null;

  @Prop({
    type: String,
    default: null,
  })
  countryCode?: string | null;

  @Prop({
    type: String,
  })
  twoFactor?: string | null;

  @Prop({
    type: String,
    default: null,
  })
  twoFactorPhone?: string | null;

  @Prop({
    type: String,
    default: null,
  })
  twoFactorSecret?: string | null;

  @Prop({
    type: Status,
  })
  status?: Status;

  @Prop({ type: Membership })
  membership?: Membership | null;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({
    type: String,
  })
  createdBy?: string | null;

  @Prop({
    type: String,
  })
  updatedBy?: string | null;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

UserSchema.virtual('previousPassword').get(function () {
  return this.password;
});

UserSchema.index({ 'role.id': 1 });
