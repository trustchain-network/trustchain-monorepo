import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySchema, ApiKeySchemaClass } from './entities/api-key.schema';
import { ApiKeyRepository } from '../persistence/api-key.repository';
import { ApiKeysDocumentRepository } from './repositories/api-key.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiKeySchemaClass.name, schema: ApiKeySchema },
    ]),
  ],
  providers: [
    {
      provide: ApiKeyRepository,
      useClass: ApiKeysDocumentRepository,
    },
  ],
  exports: [ApiKeyRepository],
})
export class DocumentApiKeyPersistenceModule {}
