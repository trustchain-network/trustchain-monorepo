import { Module } from '@nestjs/common';

import { NfcsService } from './nfcs.service';
import { NfcsController } from './controllers/nfcs.controller';
import { NfcsPublicController } from './controllers/nfcs-public.controller';
import { UsersModule } from '../users/users.module';
import { RelationalNfcPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SdmModule } from 'src/providers/sdm/sdm.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateNfcEventHandler } from './cqrs/update-nfc.event';

@Module({
  imports: [RelationalNfcPersistenceModule, UsersModule, SdmModule, CqrsModule],
  controllers: [NfcsController, NfcsPublicController],
  providers: [NfcsService, UpdateNfcEventHandler],
  exports: [NfcsService],
})
export class NfcsModule {}
