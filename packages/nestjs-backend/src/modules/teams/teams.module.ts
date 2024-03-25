import { Module } from '@nestjs/common';
import databaseConfig from 'src/providers/database/config/database.config';
import { DatabaseConfig } from 'src/providers/database/config/database-config.type';
import { DocumentTeamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalTeamPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { UsersModule } from '../users';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentTeamPersistenceModule
  : RelationalTeamPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService, infrastructurePersistenceModule],
})
export class TeamsModule {}
