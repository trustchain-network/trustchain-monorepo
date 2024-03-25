import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from 'src/utils/types/nullable.type';
import { ApiKeyRepository } from '../../persistence/api-key.repository';
import { ApiKeySchemaClass } from '../entities/api-key.schema';
import { ApiKey } from 'src/modules/api-keys/domain/api-key';
import { ApiKeyMapper } from '../mappers/api-key.mapper';

@Injectable()
export class ApiKeysDocumentRepository implements ApiKeyRepository {
  constructor(
    @InjectModel(ApiKeySchemaClass.name)
    private readonly ApiKeysModel: Model<ApiKeySchemaClass>,
  ) {}

  async create(data: ApiKey): Promise<ApiKey> {
    const persistenceModel = ApiKeyMapper.toPersistence(data);
    const createdApiKey = new this.ApiKeysModel(persistenceModel);
    const apiKeyObject = await createdApiKey.save();
    return ApiKeyMapper.toDomain(apiKeyObject);
  }

  async findOne(
    fields: EntityCondition<ApiKey>,
  ): Promise<NullableType<ApiKey>> {
    if (fields.id) {
      const apiKeyObject = await this.ApiKeysModel.findById(fields.id);
      return apiKeyObject ? ApiKeyMapper.toDomain(apiKeyObject) : null;
    }

    const apiKeyObject = await this.ApiKeysModel.findOne(fields);
    return apiKeyObject ? ApiKeyMapper.toDomain(apiKeyObject) : null;
  }

  async update(
    id: ApiKey['id'],
    payload: Partial<ApiKey>,
  ): Promise<ApiKey | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const apiKeyObject = await this.ApiKeysModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return apiKeyObject ? ApiKeyMapper.toDomain(apiKeyObject) : null;
  }

  async softDelete(id: ApiKey['id']): Promise<void> {
    await this.ApiKeysModel.deleteOne({
      _id: id,
    });
  }
}
