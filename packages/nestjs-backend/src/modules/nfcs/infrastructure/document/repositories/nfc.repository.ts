import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from 'src/utils/types/nullable.type';
import { NfcSchemaClass } from '../entities/nfc.schema';
import { NfcMapper } from '../mappers/nfc.mapper';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NfcRepository } from '../../persistence/nfc.repository';
import { NFC } from 'src/modules/nfcs/domain/nfc';

@Injectable()
export class NfcsDocumentRepository implements NfcRepository {
  constructor(
    @InjectModel(NfcSchemaClass.name)
    private readonly nfcsModel: Model<NfcSchemaClass>,
  ) {}

  async create(data: NFC): Promise<NFC> {
    const persistenceModel = NfcMapper.toPersistence(data);
    const createdNfc = new this.nfcsModel(persistenceModel);
    const nfcObject = await createdNfc.save();
    return NfcMapper.toDomain(nfcObject);
  }

  async findOne(fields: EntityCondition<NFC>): Promise<NullableType<NFC>> {
    if (fields.id) {
      const nfcObject = await this.nfcsModel.findById(fields.id);
      return nfcObject ? NfcMapper.toDomain(nfcObject) : null;
    }

    const nfcObject = await this.nfcsModel.findOne(fields);
    return nfcObject ? NfcMapper.toDomain(nfcObject) : null;
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: any[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<NFC[]> {
    const sort = sortOptions?.reduce(
      (accumulator, sort) => ({
        ...accumulator,
        [sort.orderBy]: sort.order,
      }),
      {},
    );

    const nfcObjects = await this.nfcsModel
      .find()
      .sort(sort)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return nfcObjects.map((nfcObject) => NfcMapper.toDomain(nfcObject));
  }

  async update(id: NFC['id'], payload: Partial<NFC>): Promise<NFC | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const nfcObject = await this.nfcsModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return nfcObject ? NfcMapper.toDomain(nfcObject) : null;
  }

  async softDelete(id: NFC['id']): Promise<void> {
    await this.nfcsModel.deleteOne({
      _id: id,
    });
  }
}
