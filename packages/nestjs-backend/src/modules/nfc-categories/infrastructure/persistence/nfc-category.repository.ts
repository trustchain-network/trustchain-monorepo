import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { NfcCategory } from 'src/modules/nfc-categories/domain/nfc-category';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export abstract class NfcCategoryRepository {
  abstract create(
    data: Omit<NfcCategory, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<NfcCategory>;

  abstract findOne(
    fields: EntityCondition<NfcCategory>,
  ): Promise<NullableType<NfcCategory>>;

  abstract update(
    id: NfcCategory['id'],
    payload: DeepPartial<NfcCategory>,
  ): Promise<NfcCategory | null>;

  abstract softDelete(id: NfcCategory['id']): Promise<void>;
}
