import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { TeamRepository } from '../team.repository';
import { TeamsRelationalRepository } from './repositories/team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  providers: [
    {
      provide: TeamRepository,
      useClass: TeamsRelationalRepository,
    },
  ],
  exports: [TeamRepository],
})
export class RelationalTeamPersistenceModule {}
