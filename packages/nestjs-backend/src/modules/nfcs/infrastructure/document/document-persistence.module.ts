import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NfcSchema, NfcSchemaClass } from './entities/nfc.schema';
import { NfcsDocumentRepository } from './repositories/nfc.repository';
import { NfcRepository } from '../persistence/nfc.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NfcSchemaClass.name, schema: NfcSchema },
    ]),
  ],
  providers: [
    {
      provide: NfcRepository,
      useClass: NfcsDocumentRepository,
    },
  ],
  exports: [NfcRepository],
})
export class DocumentNfcPersistenceModule {}
