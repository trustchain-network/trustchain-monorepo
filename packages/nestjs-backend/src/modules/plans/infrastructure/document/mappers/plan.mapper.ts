import { Plan } from 'src/modules/plans/domain/plan';
import { PlanSchemaClass } from '../entities/plan.schema';
import { User } from 'src/modules/users/domain/user';

export class PlanMapper {
  static toDomain(raw: PlanSchemaClass): Plan {
    const plan = new Plan();
    plan.id = Number(raw._id);
    plan.name = raw.name;
    plan.description = raw.description;
    plan.price = raw.price;
    plan.currency = raw.currency;
    plan.duration = raw.duration;
    plan.durationType = raw.durationType;
    plan.createdAt = raw.createdAt;
    plan.updatedAt = raw.updatedAt;
    plan.deletedAt = raw.deletedAt;
    plan.createdBy = raw.createdBy;
    plan.updatedBy = raw.updatedBy;
    return plan;
  }

  static toPersistence(plan: Plan): PlanSchemaClass {
    let user: User | undefined = new User();

    if (plan.createdBy) {
      user.id = plan.createdBy.id;
    }

    if (plan.updatedBy) {
      user.id = plan.updatedBy.id;
    }

    const planEntity = new PlanSchemaClass();
    if (plan.id && typeof plan.id === 'number') {
      planEntity._id = plan.id.toString();
    }
    planEntity.name = plan.name;
    planEntity.description = plan.description;
    planEntity.price = plan.price;
    planEntity.currency = plan.currency;
    planEntity.duration = plan.duration;
    planEntity.durationType = plan.durationType;
    planEntity.createdAt = plan.createdAt;
    planEntity.updatedAt = plan.updatedAt;
    planEntity.deletedAt = plan.deletedAt;
    planEntity.createdBy = user;
    planEntity.updatedBy = user;
    return planEntity;
  }
}
