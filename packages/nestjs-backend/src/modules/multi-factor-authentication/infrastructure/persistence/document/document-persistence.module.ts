import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultiFactorAuthenticationSchema,
  MultiFactorAuthenticationSchemaClass,
} from './entities/multi-factor-authentication.schema';
import { MultiFactorAuthenticationRepository } from '../multi-factor-authentication.repository';
import { MultiFactorAuthenticationsDocumentRepository } from './repositories/multi-factor-authentication.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MultiFactorAuthenticationSchemaClass.name,
        schema: MultiFactorAuthenticationSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: MultiFactorAuthenticationRepository,
      useClass: MultiFactorAuthenticationsDocumentRepository,
    },
  ],
  exports: [MultiFactorAuthenticationRepository],
})
export class DocumentMultiFactorAuthenticationPersistenceModule {}
