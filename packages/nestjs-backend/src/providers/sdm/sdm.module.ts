import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SdmService } from './sdm.service';
import { SdmController } from './sdm.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [SdmService, ConfigService],
  controllers: [SdmController],
})
export class SdmModule {}
