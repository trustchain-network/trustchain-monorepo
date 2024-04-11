import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcScan } from './entities/nfc-scan.entity';
import { NfcScanService } from './nfc-scan.service';

@Module({
  imports: [TypeOrmModule.forFeature([NfcScan])],
  providers: [NfcScanService],
  exports: [NfcScanService],
})
export class NfcScanModule {}
