import { ApiKey } from 'src/modules/api-keys/domain/api-key';
import { ApiKeySchemaClass } from '../entities/api-key.schema';

export class ApiKeyMapper {
  static toDomain(raw: ApiKeySchemaClass): ApiKey {
    const apiKey = new ApiKey();
    apiKey.id = raw._id.toString();
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

  static toPersistence(apiKey: ApiKey): ApiKeySchemaClass {
    const apiKeyEntity = new ApiKeySchemaClass();
    if (apiKey.id && typeof apiKey.id === 'string') {
      apiKeyEntity._id = apiKey.id;
    }
    if (apiKey.name && typeof apiKey.name === 'string') {
      apiKeyEntity.name = apiKey.name;
    }
    if (apiKey.description && typeof apiKey.description === 'string') {
      apiKeyEntity.description = apiKey.description;
    }
    if (apiKey.scopes && Array.isArray(apiKey.scopes)) {
      apiKeyEntity.scopes = apiKey.scopes;
    }
    if (apiKey.ipAllowlist && Array.isArray(apiKey.ipAllowlist)) {
      apiKeyEntity.ipAllowlist = apiKey.ipAllowlist;
    }
    if (apiKey.ipRestrictions && Array.isArray(apiKey.ipRestrictions)) {
      apiKeyEntity.ipRestrictions = apiKey.ipRestrictions;
    }

    apiKeyEntity.createdAt = apiKey.createdAt;
    apiKeyEntity.updatedAt = apiKey.updatedAt;
    apiKeyEntity.deletedAt = apiKey.deletedAt;
    return apiKeyEntity;
  }
}
