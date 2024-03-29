import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcGroupEntity } from './entities/nfc-group.entity';
import { NfcGroupsRelationalRepository } from './repositories/nfc-group.repository';
import { NfcGroupRepository } from '../nfc-group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NfcGroupEntity])],
  providers: [
    {
      provide: NfcGroupRepository,
      useClass: NfcGroupsRelationalRepository,
    },
  ],
  exports: [NfcGroupRepository],
})
export class RelationalNfcGroupPersistenceModule {}
