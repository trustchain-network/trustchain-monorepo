import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { PlanRepository } from './infrastructure/persistence/plan.repository';
import { Plan } from './domain/plan';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

@Injectable()
export class PlansService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createPlanDto: CreatePlanDto,
    logedInUserId?: string | null | undefined,
  ): Promise<Plan> {
    const clonedPayload = { ...createPlanDto };
    let user: User | null = null;
    if (logedInUserId) {
      user =
        (await this.usersService.findOne({
          id: logedInUserId,
        })) ?? null;
      if (user) {
        clonedPayload.createdBy = user;
        clonedPayload.updatedBy = user;
      }
    }

    return this.planRepository.create(clonedPayload);
  }

  findAll(): Promise<Plan[]> {
    return this.planRepository.findAll();
  }

  findOne(fields: Partial<Plan>): Promise<Plan | null> {
    return this.planRepository.findOne(fields);
  }

  async update(
    id: Plan['id'],
    payload: DeepPartial<Plan>,
    logedInUserId?: string,
  ): Promise<Plan | null> {
    const clonedPayload = { ...payload };
    let user: User | null = null;
    if (logedInUserId) {
      user =
        (await this.usersService.findOne({
          id: logedInUserId,
        })) ?? null;
      if (user) {
        clonedPayload.updatedBy = user;
      }
    }

    return this.planRepository.update(id, clonedPayload);
  }

  async softDelete(id: Plan['id']): Promise<void> {
    await this.planRepository.softDelete(id);
  }
}
