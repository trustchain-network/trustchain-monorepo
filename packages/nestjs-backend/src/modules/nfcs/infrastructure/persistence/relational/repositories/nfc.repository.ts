import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NfcEntity } from '../entities/nfc.entity';
import { NfcMapper } from '../mappers/nfc.mapper';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcRepository } from '../../nfc.repository';

@Injectable()
export class NfcsRelationalRepository implements NfcRepository {
  constructor(
    @InjectRepository(NfcEntity)
    private readonly nfcsRepository: Repository<NfcEntity>,
  ) {}

  async create(data: NFC): Promise<NFC> {
    const persistenceModel = NfcMapper.toPersistence(data);
    const newEntity = await this.nfcsRepository.save(
      this.nfcsRepository.create(persistenceModel),
    );
    return NfcMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions: any;
    paginationOptions: any;
  }): Promise<NFC[]> {
    const where: FindOptionsWhere<NfcEntity> = {};

    const entities = await this.nfcsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((nfc) => NfcMapper.toDomain(nfc));
  }

  async findOne(fields: EntityCondition<NFC>): Promise<NullableType<NFC>> {
    const entity = await this.nfcsRepository.findOne({
      where: fields as FindOptionsWhere<NfcEntity>,
    });

    return entity ? NfcMapper.toDomain(entity) : null;
  }

  async update(id: NFC['id'], payload: Partial<NFC>): Promise<NFC> {
    const entity = await this.nfcsRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('NFC not found');
    }

    const updatedEntity = await this.nfcsRepository.save(
      this.nfcsRepository.create(
        NfcMapper.toPersistence({
          ...NfcMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NfcMapper.toDomain(updatedEntity);
  }

  async softDelete(id: NFC['id']): Promise<void> {
    await this.nfcsRepository.softDelete(id);
  }
}
