import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { NfcCategorySchemaClass } from '../entities/nfc-category.schema';
import { NfcCategory } from 'src/modules/nfc-categories/domain/nfc-category';
import { NfcCategoryMapper } from '../mappers/nfc-category.mapper';
import { NfcCategoryRepository } from '../../persistence/nfc-category.repository';

@Injectable()
export class NfcCategoriesDocumentRepository implements NfcCategoryRepository {
  constructor(
    @InjectModel(NfcCategorySchemaClass.name)
    private readonly nfcCategoryModel: Model<NfcCategorySchemaClass>,
  ) {}

  async create(data: NfcCategory): Promise<NfcCategory> {
    const persistenceModel = NfcCategoryMapper.toPersistence(data);
    const createdNfcCategory = new this.nfcCategoryModel(persistenceModel);
    const nfcCategoryObject = await createdNfcCategory.save();
    return NfcCategoryMapper.toDomain(nfcCategoryObject);
  }

  async findOne(
    fields: EntityCondition<NfcCategory>,
  ): Promise<NullableType<NfcCategory>> {
    if (fields.id) {
      const nfcCategoryObject = await this.nfcCategoryModel.findById(fields.id);
      return nfcCategoryObject
        ? NfcCategoryMapper.toDomain(nfcCategoryObject)
        : null;
    }

    const nfcCategoryObject = await this.nfcCategoryModel.findOne(fields);
    return nfcCategoryObject
      ? NfcCategoryMapper.toDomain(nfcCategoryObject)
      : null;
  }

  async update(
    id: NfcCategory['id'],
    payload: Partial<NfcCategory>,
  ): Promise<NfcCategory | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const nfcCategoryObject = await this.nfcCategoryModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return nfcCategoryObject
      ? NfcCategoryMapper.toDomain(nfcCategoryObject)
      : null;
  }

  async softDelete(id: NfcCategory['id']): Promise<void> {
    await this.nfcCategoryModel.deleteOne({
      _id: id,
    });
  }
}
