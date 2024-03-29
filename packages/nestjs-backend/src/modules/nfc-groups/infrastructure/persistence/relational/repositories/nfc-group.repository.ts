import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NfcGroupEntity } from '../entities/nfc-group.entity';
import { NfcGroupRepository } from '../../nfc-group.repository';
import { NfcGroup } from 'src/modules/nfc-groups/domain/nfc-group';
import { NfcGroupMapper } from '../mappers/nfc-group.mapper';

@Injectable()
export class NfcGroupsRelationalRepository implements NfcGroupRepository {
  constructor(
    @InjectRepository(NfcGroupEntity)
    private readonly nfcGroupsRepository: Repository<NfcGroupEntity>,
  ) {}

  async create(data: NfcGroup): Promise<NfcGroup> {
    const persistenceModel = NfcGroupMapper.toPersistence(data);
    const newEntity = await this.nfcGroupsRepository.save(
      this.nfcGroupsRepository.create(persistenceModel),
    );
    return NfcGroupMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<NfcGroup>,
  ): Promise<NullableType<NfcGroup>> {
    const entity = await this.nfcGroupsRepository.findOne({
      where: fields as FindOptionsWhere<NfcGroupEntity>,
    });

    return entity ? NfcGroupMapper.toDomain(entity) : null;
  }

  async update(
    id: NfcGroup['id'],
    payload: Partial<NfcGroup>,
  ): Promise<NfcGroup> {
    const entity = await this.nfcGroupsRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('NfcGroup not found');
    }

    const updatedEntity = await this.nfcGroupsRepository.save(
      this.nfcGroupsRepository.create(
        NfcGroupMapper.toPersistence({
          ...NfcGroupMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NfcGroupMapper.toDomain(updatedEntity);
  }

  async softDelete(id: NfcGroup['id']): Promise<void> {
    await this.nfcGroupsRepository.softDelete(id);
  }
}
