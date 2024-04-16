import { Module } from '@nestjs/common';
import {
  offchainStorageProvider,
  offchainStorageProvisionToken,
} from './offchain-storage.provider';
import { OffchainStorageController } from './offchain-storage.controller';
import { OffchainStorageService } from './offchain-storage.service';

@Module({
  providers: [offchainStorageProvider, OffchainStorageService],
  controllers: [OffchainStorageController],
  exports: [offchainStorageProvisionToken, OffchainStorageService],
})
export class OffchainStorageModule {}
