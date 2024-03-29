import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcDetailEntity } from './entities/nfc-detail.entity';
import { NfcDetailsRelationalRepository } from './repositories/nfc-detail.repository';
import { NfcDetailRepository } from '../nfc-details.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NfcDetailEntity])],
  providers: [
    {
      provide: NfcDetailRepository,
      useClass: NfcDetailsRelationalRepository,
    },
  ],
  exports: [NfcDetailRepository],
})
export class RelationalNfcPersistenceModule {}
