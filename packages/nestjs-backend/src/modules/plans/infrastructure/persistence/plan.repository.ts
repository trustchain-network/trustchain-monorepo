import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { Plan } from '../../domain/plan';

export abstract class PlanRepository {
  abstract create(
    data: Omit<Plan, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Plan>;

  abstract findOne(fields: EntityCondition<Plan>): Promise<NullableType<Plan>>;

  abstract findAll(): Promise<Plan[]>;

  abstract update(
    id: Plan['id'],
    payload: DeepPartial<Plan>,
  ): Promise<Plan | null>;

  abstract softDelete(id: Plan['id']): Promise<void>;
}
