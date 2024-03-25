// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';
// import { EntityCondition } from 'src/utils/types/entity-condition.type';
// import { NullableType } from 'src/utils/types/nullable.type';
// import { FindOptionsWhere, Repository } from 'typeorm';
// import { NfcDetailMapper } from '../mappers/nfc-detail.mapper';
// import { NfcDetailRepository } from '../../nfc-details.repository';
// import { NfcDetailEntity } from '../entities/nfc-detail.entity';
// import { SortNfcDto } from 'src/nfcs/dto/query-nfc.dto';
// import { FilterNfcDetailDto } from 'src/nfc-details/dto/query-nfc-detail.dto';
// import { IPaginationOptions } from 'src/utils/types/pagination-options';

// @Injectable()
// export class NfcDetailsRelationalRepository implements NfcDetailRepository {
//   constructor(
//     @InjectRepository(NfcDetailEntity)
//     private readonly nfcsRepository: Repository<NfcDetailEntity>,
//   ) {}

//   async create(data: NfcDetail): Promise<NfcDetail> {
//     const persistenceModel = NfcDetailMapper.toPersistence(data);
//     const newEntity = await this.nfcsRepository.save(
//       this.nfcsRepository.create(persistenceModel),
//     );
//     return NfcDetailMapper.toDomain(newEntity);
//   }

//   //TODO: check if this is the correct implementation
//   // async findManyWithPagination({
//   //   filterOptions,
//   //   sortOptions,
//   //   paginationOptions,
//   // }: {
//   //   filterOptions: FilterNfcDetailDto | null;
//   //   sortOptions: SortNfcDto[] | null;
//   //   paginationOptions: IPaginationOptions;
//   // }): Promise<NfcDetail[]> {
//   //   const where: FindOptionsWhere<NfcDetailEntity> = {};
//   //   if (filterOptions?.icTypes?.length) {
//   //     where.icType = filterOptions.icTypes.map((icType) => ({
//   //       id: icType.id.toString(),
//   //     }));
//   //   }

//   //   const entities = await this.nfcsRepository.find({
//   //     skip: (paginationOptions.page - 1) * paginationOptions.limit,
//   //     take: paginationOptions.limit,
//   //     where: where,
//   //     order: sortOptions?.reduce(
//   //       (accumulator, sort) => ({
//   //         ...accumulator,
//   //         [sort.orderBy]: sort.order,
//   //       }),
//   //       {},
//   //     ),
//   //   });

//   //   return entities.map((entity) => NfcDetailMapper.toDomain(entity));
//   // }

//   async findOne(
//     fields: EntityCondition<NfcDetail>,
//   ): Promise<NullableType<NfcDetail>> {
//     const entity = await this.nfcsRepository.findOne({
//       where: fields as FindOptionsWhere<NfcDetailEntity>,
//     });

//     return entity ? NfcDetailMapper.toDomain(entity) : null;
//   }

//   async update(
//     id: NfcDetail['id'],
//     payload: Partial<NfcDetail>,
//   ): Promise<NfcDetail> {
//     const entity = await this.nfcsRepository.findOne({
//       where: { id: id.toString() },
//     });

//     if (!entity) {
//       throw new Error('NfcDetail not found');
//     }

//     const updatedEntity = await this.nfcsRepository.save(
//       this.nfcsRepository.create(
//         NfcDetailMapper.toPersistence({
//           ...NfcDetailMapper.toDomain(entity),
//           ...payload,
//         }),
//       ),
//     );

//     return NfcDetailMapper.toDomain(updatedEntity);
//   }

//   async softDelete(id: NfcDetail['id']): Promise<void> {
//     await this.nfcsRepository.softDelete(id);
//   }
// }
