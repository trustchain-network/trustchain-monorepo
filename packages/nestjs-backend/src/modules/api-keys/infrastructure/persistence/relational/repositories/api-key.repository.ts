import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ApiKeyEntity } from '../entities/api-key.entity';
import { ApiKey } from 'src/modules/api-keys/domain/api-key';
import { ApiKeyMapper } from '../mappers/api-key.mapper';
import { ApiKeyRepository } from '../../api-key.repository';

@Injectable()
export class ApiKeysRelationalRepository implements ApiKeyRepository {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly apiKeysRepository: Repository<ApiKeyEntity>,
  ) {}

  async create(data: ApiKey): Promise<ApiKey> {
    const persistenceModel = ApiKeyMapper.toPersistence(data);
    const newEntity = await this.apiKeysRepository.save(
      this.apiKeysRepository.create(persistenceModel),
    );
    return ApiKeyMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<ApiKey>,
  ): Promise<NullableType<ApiKey>> {
    const entity = await this.apiKeysRepository.findOne({
      where: fields as FindOptionsWhere<ApiKeyEntity>,
    });

    return entity ? ApiKeyMapper.toDomain(entity) : null;
  }

  async update(id: ApiKey['id'], payload: Partial<ApiKey>): Promise<ApiKey> {
    const entity = await this.apiKeysRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('ApiKey not found');
    }

    const updatedEntity = await this.apiKeysRepository.save(
      this.apiKeysRepository.create(
        ApiKeyMapper.toPersistence({
          ...ApiKeyMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ApiKeyMapper.toDomain(updatedEntity);
  }

  async softDelete(id: ApiKey['id']): Promise<void> {
    await this.apiKeysRepository.softDelete(id);
  }
}
