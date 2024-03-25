import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcCategoryEntity } from './entities/nfc-category.entity';
import { NfcCategoryRepository } from '../nfc-category.repository';
import { NfcCategoriesRelationalRepository } from './repositories/nfc-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NfcCategoryEntity])],
  providers: [
    {
      provide: NfcCategoryRepository,
      useClass: NfcCategoriesRelationalRepository,
    },
  ],
  exports: [NfcCategoryRepository],
})
export class RelationalNfcCategoryPersistenceModule {}
