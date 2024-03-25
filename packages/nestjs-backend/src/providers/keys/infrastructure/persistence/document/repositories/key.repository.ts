import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { KeyRepository } from '../../key.repository';
import { KeySchemaClass } from '../entities/key.schema';
import { Key } from 'src/providers/keys/domain/key';
import { KeyMapper } from '../mappers/key.mapper';

@Injectable()
export class KeysDocumentRepository implements KeyRepository {
  constructor(
    @InjectModel(KeySchemaClass.name)
    private readonly keysModel: Model<KeySchemaClass>,
  ) {}

  async create(data: Key): Promise<Key> {
    const persistenceModel = KeyMapper.toPersistence(data);
    const createdKey = new this.keysModel(persistenceModel);
    const keyObject = await createdKey.save();
    return KeyMapper.toDomain(keyObject);
  }

  async findOne(fields: EntityCondition<Key>): Promise<NullableType<Key>> {
    if (fields.id) {
      const keyObject = await this.keysModel.findById(fields.id);
      return keyObject ? KeyMapper.toDomain(keyObject) : null;
    }

    const keyObject = await this.keysModel.findOne(fields);
    return keyObject ? KeyMapper.toDomain(keyObject) : null;
  }

  async update(id: Key['id'], payload: Partial<Key>): Promise<Key | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const keyObject = await this.keysModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return keyObject ? KeyMapper.toDomain(keyObject) : null;
  }

  async softDelete(id: Key['id']): Promise<void> {
    await this.keysModel.deleteOne({
      _id: id,
    });
  }
}
