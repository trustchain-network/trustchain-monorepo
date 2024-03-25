import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NfcCategorySchema,
  NfcCategorySchemaClass,
} from './entities/nfc-category.schema';
import { NfcCategoriesDocumentRepository } from './repositories/nfc-category.repository';
import { NfcCategoryRepository } from '../persistence/nfc-category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NfcCategorySchemaClass.name, schema: NfcCategorySchema },
    ]),
  ],
  providers: [
    {
      provide: NfcCategoryRepository,
      useClass: NfcCategoriesDocumentRepository,
    },
  ],
  exports: [NfcCategoryRepository],
})
export class DocumentNfcCategoryPersistenceModule {}
