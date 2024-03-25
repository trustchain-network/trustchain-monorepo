import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { NfcCategoryRepository } from '../../nfc-category.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NfcCategoryEntity } from '../entities/nfc-category.entity';
import { NfcCategoryMapper } from '../mappers/nfc-category.mapper';
import { NfcCategory } from 'src/modules/nfc-categories/domain/nfc-category';

@Injectable()
export class NfcCategoriesRelationalRepository
  implements NfcCategoryRepository
{
  constructor(
    @InjectRepository(NfcCategoryEntity)
    private readonly plansRepository: Repository<NfcCategoryEntity>,
  ) {}

  async create(data: NfcCategory): Promise<NfcCategory> {
    const persistenceModel = NfcCategoryMapper.toPersistence(data);
    const newEntity = await this.plansRepository.save(
      this.plansRepository.create(persistenceModel),
    );
    return NfcCategoryMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<NfcCategory>,
  ): Promise<NullableType<NfcCategory>> {
    const entity = await this.plansRepository.findOne({
      where: fields as FindOptionsWhere<NfcCategoryEntity>,
    });

    return entity ? NfcCategoryMapper.toDomain(entity) : null;
  }

  async update(
    id: NfcCategory['id'],
    payload: Partial<NfcCategory>,
  ): Promise<NfcCategory> {
    const entity = await this.plansRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('Nfc Category not found');
    }

    const updatedEntity = await this.plansRepository.save(
      this.plansRepository.create(
        NfcCategoryMapper.toPersistence({
          ...NfcCategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NfcCategoryMapper.toDomain(updatedEntity);
  }

  async softDelete(id: NfcCategory['id']): Promise<void> {
    await this.plansRepository.softDelete(id);
  }
}
