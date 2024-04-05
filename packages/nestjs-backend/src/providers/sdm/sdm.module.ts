import { Module } from '@nestjs/common';
import { HttpModule } from '../http/http.module';
import { SdmService } from './sdm.service';
import { SdmController } from './sdm.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [SdmService, ConfigService],
  controllers: [SdmController],
  exports: [SdmService],
})
export class SdmModule {}
