import { Plan } from 'src/modules/plans/domain/plan';
import { PlanEntity } from '../entities/plan.entity';
import { User } from 'src/modules/users/domain/user';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';

export class PlanMapper {
  static toDomain(raw: PlanEntity): Plan {
    const plan = new Plan();
    plan.id = raw.id;
    plan.name = raw.name;
    plan.description = raw.description;
    plan.price = raw.price;
    plan.currency = raw.currency;
    plan.duration = raw.duration;
    plan.durationType = raw.durationType;

    plan.createdAt = raw.createdAt;
    plan.updatedAt = raw.updatedAt;
    plan.deletedAt = raw.deletedAt;
    plan.createdBy = raw.createdBy as User;
    plan.updatedBy = raw.updatedBy as User;
    return plan;
  }

  static toPersistence(plan: Plan): PlanEntity {
    let userEntity: UserEntity | undefined = new UserEntity();
    if (plan.createdBy) {
      userEntity.id = plan.createdBy.id;
    }

    if (plan.updatedBy) {
      userEntity.id = plan.updatedBy.id;
    }

    const planEntity = new PlanEntity();
    if (plan.id && typeof plan.id === 'number') {
      planEntity.id = plan.id;
    }

    planEntity.name = plan.name;
    planEntity.description = plan.description;
    planEntity.price = plan.price;
    planEntity.currency = plan.currency;

    if (plan.duration && typeof plan.duration === 'number') {
      planEntity.duration = plan.duration;
    }

    if (plan.durationType && typeof plan.durationType === 'string') {
      planEntity.durationType = plan.durationType;
    }

    planEntity.createdAt = plan.createdAt;
    planEntity.updatedAt = plan.updatedAt;
    planEntity.deletedAt = plan.deletedAt;
    planEntity.createdBy = userEntity;
    planEntity.updatedBy = userEntity;
    return planEntity;
  }
}
