import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MultiFactorAuthenticationRepository } from '../../multi-factor-authentication.repository';
import { MultiFactorAuthenticationSchemaClass } from '../entities/multi-factor-authentication.schema';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';
import { MultiFactorAuthenticationMapper } from '../mappers/multi-factor-authentication.mapper';

@Injectable()
export class MultiFactorAuthenticationsDocumentRepository
  implements MultiFactorAuthenticationRepository
{
  constructor(
    @InjectModel(MultiFactorAuthenticationSchemaClass.name)
    private readonly usersModel: Model<MultiFactorAuthenticationSchemaClass>,
  ) {}

  async create(
    data: MultiFactorAuthentication,
  ): Promise<MultiFactorAuthentication> {
    const persistenceModel =
      MultiFactorAuthenticationMapper.toPersistence(data);
    const createdMultiFactorAuthentication = new this.usersModel(
      persistenceModel,
    );
    const userObject = await createdMultiFactorAuthentication.save();
    return MultiFactorAuthenticationMapper.toDomain(userObject);
  }

  async findOne(
    fields: EntityCondition<MultiFactorAuthentication>,
  ): Promise<NullableType<MultiFactorAuthentication>> {
    if (fields.id) {
      const userObject = await this.usersModel.findById(fields.id);
      return userObject
        ? MultiFactorAuthenticationMapper.toDomain(userObject)
        : null;
    }

    const userObject = await this.usersModel.findOne(fields);
    return userObject
      ? MultiFactorAuthenticationMapper.toDomain(userObject)
      : null;
  }

  async update(
    id: MultiFactorAuthentication['id'],
    payload: Partial<MultiFactorAuthentication>,
  ): Promise<MultiFactorAuthentication | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return userObject
      ? MultiFactorAuthenticationMapper.toDomain(userObject)
      : null;
  }

  async softDelete(id: MultiFactorAuthentication['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id,
    });
  }
}
