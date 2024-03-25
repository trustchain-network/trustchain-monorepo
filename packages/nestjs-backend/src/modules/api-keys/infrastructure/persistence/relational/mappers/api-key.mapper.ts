import { ApiKey } from 'src/modules/api-keys/domain/api-key';
import { ApiKeyEntity } from '../entities/api-key.entity';

export class ApiKeyMapper {
  static toDomain(raw: ApiKeyEntity): ApiKey {
    const apiKey = new ApiKey();
    apiKey.id = raw.id;
    apiKey.name = raw.name;
    apiKey.description = raw.description;
    apiKey.scopes = raw.scopes;
    apiKey.ipAllowlist = raw.ipAllowlist;
    apiKey.ipRestrictions = raw.ipRestrictions;

    apiKey.createdAt = raw.createdAt;
    apiKey.updatedAt = raw.updatedAt;
    apiKey.deletedAt = raw.deletedAt;
    return apiKey;
  }

  static toPersistence(apiKey: ApiKey): ApiKeyEntity {
    const apiKeyEntity = new ApiKeyEntity();
    if (apiKey.id && typeof apiKey.id === 'number') {
      apiKeyEntity.id = apiKey.id;
    }
    if (apiKey.name && typeof apiKey.name === 'string') {
      apiKeyEntity.name = apiKey.name;
    }
    apiKeyEntity.description = apiKey.description;
    apiKeyEntity.scopes = apiKey.scopes;
    apiKeyEntity.ipAllowlist = apiKey.ipAllowlist;
    apiKeyEntity.ipRestrictions = apiKey.ipRestrictions;

    apiKeyEntity.createdAt = apiKey.createdAt;
    apiKeyEntity.updatedAt = apiKey.updatedAt;
    apiKeyEntity.deletedAt = apiKey.deletedAt;
    return apiKeyEntity;
  }
}
