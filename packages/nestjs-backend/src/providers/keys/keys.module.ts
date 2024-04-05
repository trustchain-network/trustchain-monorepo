import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { RelationalKeyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [ConfigModule, RelationalKeyPersistenceModule],
  providers: [KeysService],
  controllers: [KeysController],
  exports: [KeysService, RelationalKeyPersistenceModule],
})
export class KeysModule {}
