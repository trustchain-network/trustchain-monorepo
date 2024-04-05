import { Module } from '@nestjs/common';
import { NfcDetailsService } from './nfc-details.service';
import { NfcDetailsController } from './nfc-details.controller';
import { RelationalNfcPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';

const infrastructurePersistenceModule = RelationalNfcPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  providers: [NfcDetailsService],
  controllers: [NfcDetailsController],
  exports: [NfcDetailsService, infrastructurePersistenceModule],
})
export class NfcDetailsModule {}
