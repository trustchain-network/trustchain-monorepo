import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { Team } from '../../domain/team';

export abstract class TeamRepository {
  abstract create(
    data: Omit<Team, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Team>;

  abstract findOne(fields: EntityCondition<Team>): Promise<NullableType<Team>>;

  abstract update(
    id: Team['id'],
    payload: DeepPartial<Team>,
  ): Promise<Team | null>;

  abstract softDelete(id: Team['id']): Promise<void>;
}
