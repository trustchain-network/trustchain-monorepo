import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { ApiKey } from '../../domain/api-key';

export abstract class ApiKeyRepository {
  abstract create(
    data: Omit<ApiKey, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<ApiKey>;

  abstract findOne(
    fields: EntityCondition<ApiKey>,
  ): Promise<NullableType<ApiKey>>;

  abstract update(
    id: ApiKey['id'],
    payload: DeepPartial<ApiKey>,
  ): Promise<ApiKey | null>;

  abstract softDelete(id: ApiKey['id']): Promise<void>;
}
