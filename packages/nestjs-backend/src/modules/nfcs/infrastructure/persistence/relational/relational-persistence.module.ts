import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcEntity } from './entities/nfc.entity';
import { NfcsRelationalRepository } from './repositories/nfc.repository';
import { NfcRepository } from '../nfc.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NfcEntity])],
  providers: [
    {
      provide: NfcRepository,
      useClass: NfcsRelationalRepository,
    },
  ],
  exports: [NfcRepository],
})
export class RelationalNfcPersistenceModule {}
