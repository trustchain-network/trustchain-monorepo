import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { NfcsService } from './nfcs.service';
import { NfcsController } from './controllers/nfcs.controller';
import { NfcsPublicController } from './controllers/nfcs-public.controller';
import { UsersModule } from '../users/users.module';
import { RelationalNfcPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SdmModule } from 'src/providers/sdm/sdm.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateNfcEventHandler } from './cqrs/update-nfc.event';
import {
  AddNfcScanEventHandler,
  AddNfcScanMiddleware,
} from './cqrs/add-nfc-sacn.event';
import { NfcScanModule } from '../nfc-scan/nfc-scan.module';

@Module({
  imports: [
    RelationalNfcPersistenceModule,
    UsersModule,
    SdmModule,
    CqrsModule,
    NfcScanModule,
  ],
  controllers: [NfcsController, NfcsPublicController],
  providers: [NfcsService, UpdateNfcEventHandler, AddNfcScanEventHandler],
  exports: [NfcsService],
})
export class NfcsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddNfcScanMiddleware).forRoutes(NfcsPublicController);
  }
}
