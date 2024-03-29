import { Module } from '@nestjs/common';
import { NfcGroupsService } from './nfc-groups.service';
import { NfcGroupsController } from './nfc-groups.controller';

@Module({
  providers: [NfcGroupsService],
  controllers: [NfcGroupsController],
  exports: [NfcGroupsService],
})
export class NfcGroupsModule {}
