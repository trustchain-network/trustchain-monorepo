import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { RelationalPlanPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { PlansPublicController } from './plans.public.controller';

@Module({
  imports: [RelationalPlanPersistenceModule, UsersModule],
  providers: [PlansService],
  controllers: [PlansController, PlansPublicController],
  exports: [PlansService],
})
export class PlansModule {}
