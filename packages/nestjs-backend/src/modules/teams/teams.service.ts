import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TeamRepository } from './infrastructure/persistence/team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './domain/team';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

@Injectable()
export class TeamsService {
  private logger = new Logger(TeamsService.name);

  constructor(
    private readonly teamsRepository: TeamRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createTeamDto: CreateTeamDto,
    logedInUserId?: string,
  ): Promise<Team> {
    const clonedPayload = {
      ...createTeamDto,
    };

    let user: User | null = null;

    if (logedInUserId) {
      user =
        (await this.usersService.findOne({
          id: logedInUserId,
        })) ?? null;
      console.log('user', user);
      if (user) {
        clonedPayload.user = user;
        clonedPayload.createdBy = user;
        clonedPayload.updatedBy = user;
      }
    }

    if (clonedPayload.name) {
      const teamObject = await this.teamsRepository.findOne({
        name: clonedPayload.name,
      });
      if (teamObject) {
        this.logger.error('nameAlreadyExists');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              name: 'nameAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    clonedPayload.description = clonedPayload.description || null;

    console.log('clonedPayload', clonedPayload);
    return this.teamsRepository.create(clonedPayload);
  }

  findOne(fields: EntityCondition<Team>): Promise<NullableType<Team>> {
    return this.teamsRepository.findOne(fields);
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDto,
    logedInUserId?: string,
  ): Promise<Team | null> {
    const clonedPayload = {
      ...updateTeamDto,
    };
    let user: User | null = null;

    if (logedInUserId) {
      user =
        (await this.usersService.findOne({
          id: logedInUserId,
        })) ?? null;
      console.log('user', user);
      if (user) {
        clonedPayload.user = user;
        clonedPayload.updatedBy = user;
      }
    }

    if (clonedPayload.name) {
      const teamObject = await this.teamsRepository.findOne({
        name: clonedPayload.name,
      });
      if (teamObject && teamObject.id !== id) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              name: 'nameAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    clonedPayload.description = clonedPayload.description || null;
    return this.teamsRepository.update(id, clonedPayload);
  }

  async softDelete(id: Team['id']): Promise<void> {
    return this.teamsRepository.softDelete(id);
  }
}
