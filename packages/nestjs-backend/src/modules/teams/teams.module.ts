import { Module } from '@nestjs/common';
import { RelationalTeamPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { UsersModule } from '../users';

const infrastructurePersistenceModule = RelationalTeamPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService, infrastructurePersistenceModule],
})
export class TeamsModule {}
