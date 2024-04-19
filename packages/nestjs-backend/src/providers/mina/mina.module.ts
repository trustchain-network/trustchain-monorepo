import { Module } from '@nestjs/common';
import { MinaService } from './mina.service';
import { MinaController } from './mina.controller';
import { KeysModule } from 'src/providers/keys/keys.module';

@Module({
  imports: [KeysModule],
  providers: [MinaService],
  controllers: [MinaController],
  exports: [MinaService],
})
export class MinaModule {}
