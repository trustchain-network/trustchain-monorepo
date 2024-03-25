import { Team } from 'src/modules/teams/domain/team';
import { TeamSchemaClass } from '../entities/team.schema';
import { User } from 'src/modules/users/domain/user';

export class TeamMapper {
  static toDomain(raw: TeamSchemaClass): Team {
    const team = new Team();
    team.id = raw._id.toString();
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

  static toPersistence(team: Team): TeamSchemaClass {
    let user: User | undefined = undefined;
    if (team.user) {
      user = new User();
      user.id = team.user.id;
    }

    const teamEntity = new TeamSchemaClass();
    if (team.id && typeof team.id === 'string') {
      teamEntity._id = team.id;
    }
    teamEntity.user = user as User;
    teamEntity.name = team.name;
    teamEntity.description = team.description;
    teamEntity.createdAt = team.createdAt;
    teamEntity.updatedAt = team.updatedAt;
    teamEntity.deletedAt = team.deletedAt;
    teamEntity.createdBy = team.createdBy;
    teamEntity.updatedBy = team.updatedBy;
    return teamEntity;
  }
}
