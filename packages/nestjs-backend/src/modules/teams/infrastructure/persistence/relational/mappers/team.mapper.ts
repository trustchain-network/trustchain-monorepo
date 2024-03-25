import { Team } from 'src/modules/teams/domain/team';
import { TeamEntity } from '../entities/team.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';

export class TeamMapper {
  static toDomain(raw: TeamEntity): Team {
    const team = new Team();
    team.id = raw.id;
    team.user = raw.user;
    team.name = raw.name;
    team.description = raw.description;
    team.createdAt = raw.createdAt;
    team.updatedAt = raw.updatedAt;
    team.deletedAt = raw.deletedAt;
    team.createdBy = raw.createdBy;
    team.updatedBy = raw.updatedBy;
    return team;
  }

  static toPersistence(team: Team): TeamEntity {
    let user: UserEntity = new UserEntity();
    if (team.user) {
      user.id = team.user.id;
    }

    const teamEntity = new TeamEntity();

    if (team.id && typeof team.id === 'string') {
      teamEntity.id = team.id;
    }

    teamEntity.user = user;
    teamEntity.name = team.name;
    teamEntity.description = team.description;
    teamEntity.createdAt = team.createdAt;
    teamEntity.updatedAt = team.updatedAt;
    teamEntity.deletedAt = team.deletedAt;
    teamEntity.createdBy = team.createdBy as UserEntity;
    teamEntity.updatedBy = team.updatedBy as UserEntity;
    return teamEntity;
  }
}
