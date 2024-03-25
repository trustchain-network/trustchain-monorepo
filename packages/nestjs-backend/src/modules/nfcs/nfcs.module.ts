import { Module } from '@nestjs/common';
import databaseConfig from 'src/providers/database/config/database.config';
import { DatabaseConfig } from 'src/providers/database/config/database-config.type';

import { NfcsService } from './nfcs.service';
import { NfcsController } from './nfcs.controller';
import { UsersModule } from '../users';
import { DocumentNfcPersistenceModule } from './infrastructure/document/document-persistence.module';
import { RelationalNfcPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentNfcPersistenceModule
  : RelationalNfcPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  controllers: [NfcsController],
  providers: [NfcsService],
})
export class NfcsModule {}
