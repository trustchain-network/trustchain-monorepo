import { Module } from '@nestjs/common';
import { NfcCategoriesService } from './nfc-categories.service';

@Module({
  providers: [NfcCategoriesService]
})
export class NfcCategoriesModule {}
