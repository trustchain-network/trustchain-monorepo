import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import databaseConfig from 'src/providers/database/config/database.config';
import { DatabaseConfig } from 'src/providers/database/config/database-config.type';
import { RelationalKeyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocumentKeyPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentKeyPersistenceModule
  : RelationalKeyPersistenceModule;

@Module({
  imports: [ConfigModule, infrastructurePersistenceModule],
  providers: [KeysService],
  controllers: [KeysController],
  exports: [KeysService, infrastructurePersistenceModule],
})
export class KeysModule {}
