import { Team } from 'src/modules/teams/domain/team';
import { TeamEntity } from '../entities/team.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';

export class TeamMapper {
  static toDomain(raw: TeamEntity): Team {
    const team = new Team();
    team.id = raw.id;
    team.name = raw.name;
    team.description = raw.description;
    team.user = raw.user;
    team.createdAt = raw.createdAt;
    team.updatedAt = raw.updatedAt;
    team.deletedAt = raw.deletedAt;
    team.createdBy = raw.createdBy;
    team.updatedBy = raw.updatedBy;
    team.deletedBy = raw.deletedBy;
    return team;
  }

  static toPersistence(team: Team): TeamEntity {
    let user: UserEntity = new UserEntity();
    let createdBy: UserEntity | undefined = undefined;
    let updatedBy: UserEntity | undefined = undefined;
    let deletedBy: UserEntity | undefined = undefined;

    if (team.createdBy) {
      createdBy = new UserEntity();
      createdBy.id = team.createdBy.id;
    }
    if (team.updatedBy) {
      updatedBy = new UserEntity();
      updatedBy.id = team.updatedBy.id;
    }

    if (team.deletedBy) {
      deletedBy = new UserEntity();
      deletedBy.id = team.deletedBy.id;
    }

    if (team.user) {
      user.id = team.user.id;
    }
    const teamEntity = new TeamEntity();

    if (team.id && typeof team.id === 'string') {
      teamEntity.id = team.id;
    }

    teamEntity.name = team.name;
    teamEntity.description = team.description;
    teamEntity.user = user;
    teamEntity.createdAt = team.createdAt;
    teamEntity.updatedAt = team.updatedAt;
    teamEntity.deletedAt = team.deletedAt;
    teamEntity.createdBy = createdBy;
    teamEntity.updatedBy = updatedBy;
    teamEntity.deletedBy = deletedBy;
    return teamEntity;
  }
}
