// import { NullableType } from 'src/utils/types/nullable.type';
// import { EntityCondition } from 'src/utils/types/entity-condition.type';
// import { DeepPartial } from 'src/utils/types/deep-partial.type';
// // import { IPaginationOptions } from 'src/utils/types/pagination-options';
// // import { SortNfcDto } from 'src/nfcs/dto/query-nfc.dto';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';
// // import { FilterNfcDetailDto } from 'src/nfc-details/dto/query-nfc-detail.dto';

// export abstract class NfcDetailRepository {
//   abstract create(
//     data: Omit<NfcDetail, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
//   ): Promise<NfcDetail>;

//   // abstract findManyWithPagination({
//   //   filterOptions,
//   //   sortOptions,
//   //   paginationOptions,
//   // }: {
//   //   filterOptions?: FilterNfcDetailDto | null;
//   //   sortOptions?: SortNfcDto[] | null;
//   //   paginationOptions: IPaginationOptions;
//   // }): Promise<NfcDetail[]>;

//   abstract findOne(
//     fields: EntityCondition<NfcDetail>,
//   ): Promise<NullableType<NfcDetail>>;

//   abstract update(
//     id: NfcDetail['id'],
//     payload: DeepPartial<NfcDetail>,
//   ): Promise<NfcDetail | null>;

//   abstract softDelete(id: NfcDetail['id']): Promise<void>;
// }
