import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { MultiFactorAuthentication } from 'src/modules/multi-factor-authentication/domain/multi-factor-authentication';
import { MultiFactorAuthenticationEntity } from '../entities/multi-factor-authentication.entity';
import { MultiFactorAuthenticationMapper } from '../mappers/multi-factor-authentication.mapper';
import { MultiFactorAuthenticationRepository } from '../../multi-factor-authentication.repository';

@Injectable()
export class MultiFactorAuthenticationRelationalRepository
  implements MultiFactorAuthenticationRepository
{
  constructor(
    @InjectRepository(MultiFactorAuthenticationEntity)
    private readonly multiFactorAuthenticationRepository: Repository<MultiFactorAuthenticationEntity>,
  ) {}

  async create(
    data: MultiFactorAuthentication,
  ): Promise<MultiFactorAuthentication> {
    const persistenceModel =
      MultiFactorAuthenticationMapper.toPersistence(data);
    const newEntity = await this.multiFactorAuthenticationRepository.save(
      this.multiFactorAuthenticationRepository.create(persistenceModel),
    );
    return MultiFactorAuthenticationMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<MultiFactorAuthentication>,
  ): Promise<NullableType<MultiFactorAuthentication>> {
    const entity = await this.multiFactorAuthenticationRepository.findOne({
      where: fields as FindOptionsWhere<MultiFactorAuthenticationEntity>,
    });

    return entity ? MultiFactorAuthenticationMapper.toDomain(entity) : null;
  }

  async update(
    id: MultiFactorAuthentication['id'],
    payload: Partial<MultiFactorAuthentication>,
  ): Promise<MultiFactorAuthentication> {
    const entity = await this.multiFactorAuthenticationRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('User not found');
    }

    const updatedEntity = await this.multiFactorAuthenticationRepository.save(
      this.multiFactorAuthenticationRepository.create(
        MultiFactorAuthenticationMapper.toPersistence({
          ...MultiFactorAuthenticationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MultiFactorAuthenticationMapper.toDomain(updatedEntity);
  }

  async softDelete(id: MultiFactorAuthentication['id']): Promise<void> {
    await this.multiFactorAuthenticationRepository.softDelete(id);
  }
}
