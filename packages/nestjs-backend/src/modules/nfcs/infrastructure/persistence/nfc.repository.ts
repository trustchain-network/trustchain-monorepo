import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { SortNfcDto } from 'src/modules/nfcs/dto/query-nfc.dto';

export abstract class NfcRepository {
  abstract create(
    data: Omit<NFC, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<NFC>;

  abstract findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortNfcDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<NFC[]>;

  abstract findOne(fields: EntityCondition<NFC>): Promise<NullableType<NFC>>;

  abstract update(
    id: NFC['id'],
    payload: DeepPartial<NFC>,
  ): Promise<NFC | null>;

  abstract softDelete(id: NFC['id']): Promise<void>;
}
