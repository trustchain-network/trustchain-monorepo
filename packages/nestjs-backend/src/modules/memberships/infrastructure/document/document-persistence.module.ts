import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MembershipSchema,
  MembershipSchemaClass,
} from './entities/membership.schema';
import { MembershipsDocumentRepository } from './repositories/membership.repository';
import { MembershipRepository } from '../persistence/membership.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipSchemaClass.name, schema: MembershipSchema },
    ]),
  ],
  providers: [
    {
      provide: MembershipRepository,
      useClass: MembershipsDocumentRepository,
    },
  ],
  exports: [MembershipRepository],
})
export class DocumentUserPersistenceModule {}
