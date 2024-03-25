import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/modules/plans/domain/plan';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { PlanRepository } from '../../plan.repository';
import { PlanEntity } from '../entities/plan.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PlanMapper } from '../mappers/plan.mapper';

@Injectable()
export class PlansRelationalRepository implements PlanRepository {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
  ) {}

  async create(data: Plan): Promise<Plan> {
    const persistenceModel = PlanMapper.toPersistence(data);
    const newEntity = await this.plansRepository.save(
      this.plansRepository.create(persistenceModel),
    );
    return PlanMapper.toDomain(newEntity);
  }

  async findOne(fields: EntityCondition<Plan>): Promise<NullableType<Plan>> {
    const entity = await this.plansRepository.findOne({
      where: fields as FindOptionsWhere<PlanEntity>,
    });

    return entity ? PlanMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Plan[]> {
    const entities = await this.plansRepository.find();
    return entities.map((entity) => PlanMapper.toDomain(entity));
  }

  async update(id: Plan['id'], payload: Partial<Plan>): Promise<Plan> {
    const entity = await this.plansRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Plan not found');
    }

    const updatedEntity = await this.plansRepository.save(
      this.plansRepository.create(
        PlanMapper.toPersistence({
          ...PlanMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PlanMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Plan['id']): Promise<void> {
    await this.plansRepository.softDelete(id);
  }
}
