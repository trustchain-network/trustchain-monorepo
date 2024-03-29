import { DeepPartial } from 'typeorm';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NfcGroup } from '../../domain/nfc-group';

export abstract class NfcGroupRepository {
  abstract create(
    data: Omit<NfcGroup, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<NfcGroup>;

  abstract findOne(
    fields: EntityCondition<NfcGroup>,
  ): Promise<NullableType<NfcGroup>>;

  abstract update(
    id: NfcGroup['id'],
    payload: DeepPartial<NfcGroup>,
  ): Promise<NfcGroup | null>;

  abstract softDelete(id: NfcGroup['id']): Promise<void>;
}
