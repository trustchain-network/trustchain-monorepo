import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { Membership } from 'src/modules/memberships/domain/membership';

export abstract class MembershipRepository {
  abstract create(
    data: Omit<Membership, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Membership>;

  abstract findOne(
    fields: EntityCondition<Membership>,
  ): Promise<NullableType<Membership>>;

  abstract findAll(): Promise<Membership[]>;

  abstract update(
    id: Membership['id'],
    payload: DeepPartial<Membership>,
  ): Promise<Membership | null>;

  abstract softDelete(id: Membership['id']): Promise<void>;
}
