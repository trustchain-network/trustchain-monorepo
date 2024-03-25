import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';

export abstract class MultiFactorAuthenticationRepository {
  abstract create(
    data: Omit<
      MultiFactorAuthentication,
      'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
    >,
  ): Promise<MultiFactorAuthentication>;

  abstract findOne(
    fields: EntityCondition<MultiFactorAuthentication>,
  ): Promise<NullableType<MultiFactorAuthentication>>;

  abstract update(
    id: MultiFactorAuthentication['id'],
    payload: DeepPartial<MultiFactorAuthentication>,
  ): Promise<MultiFactorAuthentication | null>;

  abstract softDelete(id: MultiFactorAuthentication['id']): Promise<void>;
}
