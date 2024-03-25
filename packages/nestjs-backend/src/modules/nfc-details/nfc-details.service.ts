// import { Injectable } from '@nestjs/common';
// import { NfcDetailRepository } from './infrastructure/persistence/nfc-details.repository';
// import { NfcDetail } from './domain/nfc-detail';
// import { NullableType } from 'src/utils/types/nullable.type';
// import {
//   FilterNfcDetailDto,
//   SortNfcDetailDto,
// } from './dto/query-nfc-detail.dto';
// import { IPaginationOptions } from 'src/utils/types/pagination-options';

// @Injectable()
// export class NfcDetailsService {
//   constructor(private readonly nfcDetailRepository: NfcDetailRepository) {}

//   async create(createNfcDetailDto: any): Promise<any> {
//     return this.nfcDetailRepository.create(createNfcDetailDto);
//   }

//   // findManyWithPagination({
//   //   filterOptions,
//   //   sortOptions,
//   //   paginationOptions,
//   // }: {
//   //   filterOptions?: FilterNfcDetailDto | null;
//   //   sortOptions?: SortNfcDetailDto[] | null;
//   //   paginationOptions: IPaginationOptions;
//   // }): Promise<NfcDetail[]> {
//   //   return this.nfcDetailRepository.findManyWithPagination({
//   //     filterOptions,
//   //     sortOptions,
//   //     paginationOptions,
//   //   });
//   // }

//   findOne(fields: any): Promise<NullableType<NfcDetail>> {
//     return this.nfcDetailRepository.findOne(fields);
//   }

//   async update(id: NfcDetail['id'], payload: any): Promise<any> {
//     return this.nfcDetailRepository.update(id, payload);
//   }

//   async softDelete(id: NfcDetail['id']): Promise<void> {
//     return this.nfcDetailRepository.softDelete(id);
//   }
// }
