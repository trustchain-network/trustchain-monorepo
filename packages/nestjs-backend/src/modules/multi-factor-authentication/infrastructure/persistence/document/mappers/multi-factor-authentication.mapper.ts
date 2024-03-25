import { FileSchemaClass } from 'src/modules/files/infrastructure/persistence/document/entities/file.schema';
import { Status } from 'src/modules/statuses/domain/status';
import { Role } from 'src/modules/roles/domain/role';
import { FileMapper } from 'src/modules/files/infrastructure/persistence/document/mappers/file.mapper';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';
import { MultiFactorAuthenticationSchemaClass } from '../entities/multi-factor-authentication.schema';

export class MultiFactorAuthenticationMapper {
  static toDomain(
    raw: MultiFactorAuthenticationSchemaClass,
  ): MultiFactorAuthentication {
    const mfa = new MultiFactorAuthentication();
    mfa.id = raw._id.toString();
    mfa.token = raw.token ?? undefined;
    mfa.phone = raw.phone ?? undefined;

    mfa.createdAt = raw.createdAt;
    mfa.updatedAt = raw.updatedAt;
    mfa.deletedAt = raw.deletedAt;
    return mfa;
  }

  static toPersistence(
    multiFactorAuthentication: MultiFactorAuthentication,
  ): MultiFactorAuthenticationSchemaClass {
    let role: Role | undefined = undefined;

    const multiFactorAuthenticationEntity =
      new MultiFactorAuthenticationSchemaClass();
    if (
      multiFactorAuthentication.id &&
      typeof multiFactorAuthentication.id === 'string'
    ) {
      multiFactorAuthenticationEntity._id = multiFactorAuthentication.id;
    }
    multiFactorAuthenticationEntity.token =
      multiFactorAuthentication.token ?? null;
    multiFactorAuthenticationEntity.phone =
      multiFactorAuthentication.phone ?? null;

    multiFactorAuthenticationEntity.createdAt =
      multiFactorAuthentication.createdAt;
    multiFactorAuthenticationEntity.updatedAt =
      multiFactorAuthentication.updatedAt;
    multiFactorAuthenticationEntity.deletedAt =
      multiFactorAuthentication.deletedAt;
    return multiFactorAuthenticationEntity;
  }
}
