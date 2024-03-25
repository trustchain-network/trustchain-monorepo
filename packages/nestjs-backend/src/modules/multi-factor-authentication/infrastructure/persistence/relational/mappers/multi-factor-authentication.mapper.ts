import { MultiFactorAuthenticationEntity } from '../entities/multi-factor-authentication.entity';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';

export class MultiFactorAuthenticationMapper {
  static toDomain(
    raw: MultiFactorAuthenticationEntity,
  ): MultiFactorAuthentication {
    const mfa = new MultiFactorAuthentication();
    mfa.id = raw.id;
    mfa.token = raw.token;
    mfa.phone = raw.phone;
    mfa.createdAt = raw.createdAt;
    mfa.updatedAt = raw.updatedAt;
    mfa.deletedAt = raw.deletedAt;
    mfa.createdBy = raw.createdBy;
    mfa.updatedBy = raw.updatedBy;
    mfa.deletedBy = raw.deletedBy;
    return mfa;
  }

  static toPersistence(
    mfa: MultiFactorAuthentication,
  ): MultiFactorAuthenticationEntity {
    const mfaEntity = new MultiFactorAuthenticationEntity();
    if (mfa.id && typeof mfa.id === 'number') {
      mfaEntity.id = mfa.id;
    }
    if (mfa.token && typeof mfa.token === 'string') {
      mfaEntity.token = mfa.token;
    }

    if (mfa.phone && typeof mfa.phone === 'string') {
      mfaEntity.phone = mfa.phone;
    } else {
      mfaEntity.phone = '';
    }

    mfaEntity.createdAt = mfa.createdAt;
    mfaEntity.updatedAt = mfa.updatedAt;
    mfaEntity.deletedAt = mfa.deletedAt;
    mfaEntity.createdBy = mfa.createdBy;
    mfaEntity.updatedBy = mfa.updatedBy;
    mfaEntity.deletedBy = mfa.deletedBy;
    return mfaEntity;
  }
}
