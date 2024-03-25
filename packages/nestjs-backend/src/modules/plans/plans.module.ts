import { Module } from '@nestjs/common';
import databaseConfig from 'src/providers/database/config/database.config';
import { DatabaseConfig } from 'src/providers/database/config/database-config.type';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { RelationalPlanPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocumentUserPersistenceModule } from './infrastructure/document/document-persistence.module';
import { UsersModule } from '../users';
import { PlansPublicController } from './plans.public.controller';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentUserPersistenceModule
  : RelationalPlanPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  providers: [PlansService],
  controllers: [PlansController, PlansPublicController],
  exports: [PlansService],
})
export class PlansModule {}
