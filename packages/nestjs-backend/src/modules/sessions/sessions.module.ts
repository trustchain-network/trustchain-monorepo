import { Module } from '@nestjs/common';
import databaseConfig from 'src/providers/database/config/database.config';
import { DatabaseConfig } from 'src/providers/database/config/database-config.type';
import { DocumentSessionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { RelationalSessionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SessionsService } from './sessions.service';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentSessionPersistenceModule
  : RelationalSessionPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  providers: [SessionsService],
  exports: [SessionsService, infrastructurePersistenceModule],
})
export class SessionsModule {}
