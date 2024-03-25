import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlanSchemaClass } from '../entities/plan.schema';
import { Plan } from 'src/modules/plans/domain/plan';
import { PlanMapper } from '../mappers/plan.mapper';
import { NullableType } from 'src/utils/types/nullable.type';
import { PlanRepository } from '../../persistence/plan.repository';

@Injectable()
export class PlansDocumentRepository implements PlanRepository {
  constructor(
    @InjectModel(PlanSchemaClass.name)
    private readonly plansModel: Model<PlanSchemaClass>,
  ) {}

  async create(data: Plan): Promise<Plan> {
    const persistenceModel = PlanMapper.toPersistence(data);
    const createdPlan = new this.plansModel(persistenceModel);
    const planObject = await createdPlan.save();
    return PlanMapper.toDomain(planObject);
  }

  async findOne(fields: EntityCondition<Plan>): Promise<NullableType<Plan>> {
    if (fields.id) {
      const planObject = await this.plansModel.findById(fields.id);
      return planObject ? PlanMapper.toDomain(planObject) : null;
    }

    const planObject = await this.plansModel.findOne(fields);
    return planObject ? PlanMapper.toDomain(planObject) : null;
  }

  async findAll(): Promise<Plan[]> {
    const planObjects = await this.plansModel.find();
    return planObjects.map((planObject) => PlanMapper.toDomain(planObject));
  }

  async update(id: Plan['id'], payload: Partial<Plan>): Promise<Plan | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const planObject = await this.plansModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return planObject ? PlanMapper.toDomain(planObject) : null;
  }

  async softDelete(id: Plan['id']): Promise<void> {
    await this.plansModel.deleteOne({
      _id: id,
    });
  }
}
