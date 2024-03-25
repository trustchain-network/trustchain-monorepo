import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema, TeamSchemaClass } from './entities/team.schema';
import { TeamRepository } from '../team.repository';
import { TeamsDocumentRepository } from './repositories/team.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamSchemaClass.name, schema: TeamSchema },
    ]),
  ],
  providers: [
    {
      provide: TeamRepository,
      useClass: TeamsDocumentRepository,
    },
  ],
  exports: [TeamRepository],
})
export class DocumentTeamPersistenceModule {}
