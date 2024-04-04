import { Module } from '@nestjs/common';

import { NfcsService } from './nfcs.service';
import { NfcsController } from './nfcs.controller';
import { UsersModule } from '../users/users.module';
import { RelationalNfcPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalNfcPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  controllers: [NfcsController],
  providers: [NfcsService],
  exports: [NfcsService],
})
export class NfcsModule {}
