import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { NfcDetail } from '../../domain/nfc-detail';

export abstract class NfcDetailRepository {
  abstract create(
    data: Omit<NfcDetail, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<NfcDetail>;

  abstract findOne(
    fields: EntityCondition<NfcDetail>,
  ): Promise<NullableType<NfcDetail>>;

  abstract update(
    id: NfcDetail['id'],
    payload: DeepPartial<NfcDetail>,
  ): Promise<NfcDetail | null>;

  abstract softDelete(id: NfcDetail['id']): Promise<void>;
}
