import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { PlanRepository } from '../plan.repository';
import { PlansRelationalRepository } from './repositories/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [
    {
      provide: PlanRepository,
      useClass: PlansRelationalRepository,
    },
  ],
  exports: [PlanRepository],
})
export class RelationalPlanPersistenceModule {}
