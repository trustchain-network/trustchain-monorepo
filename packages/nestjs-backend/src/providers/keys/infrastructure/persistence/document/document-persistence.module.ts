import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema, KeySchemaClass } from './entities/key.schema';
import { KeyRepository } from '../key.repository';
import { KeysDocumentRepository } from './repositories/key.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KeySchemaClass.name, schema: KeySchema },
    ]),
  ],
  providers: [
    {
      provide: KeyRepository,
      useClass: KeysDocumentRepository,
    },
  ],
  exports: [KeyRepository],
})
export class DocumentKeyPersistenceModule {}
