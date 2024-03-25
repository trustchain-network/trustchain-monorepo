import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Team } from 'src/modules/teams/domain/team';
import { TeamRepository } from '../../team.repository';
import { TeamEntity } from '../entities/team.entity';
import { TeamMapper } from '../mappers/team.mapper';

@Injectable()
export class TeamsRelationalRepository implements TeamRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamsRepository: Repository<TeamEntity>,
  ) {}

  async create(data: Team): Promise<Team> {
    const persistenceModel = TeamMapper.toPersistence(data);
    const newEntity = await this.teamsRepository.save(
      this.teamsRepository.create(persistenceModel),
    );
    return TeamMapper.toDomain(newEntity);
  }

  async findOne(fields: EntityCondition<Team>): Promise<NullableType<Team>> {
    const entity = await this.teamsRepository.findOne({
      where: fields as FindOptionsWhere<TeamEntity>,
    });

    return entity ? TeamMapper.toDomain(entity) : null;
  }

  async update(id: Team['id'], payload: Partial<Team>): Promise<Team> {
    const entity = await this.teamsRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('Team not found');
    }

    const updatedEntity = await this.teamsRepository.save(
      this.teamsRepository.create(
        TeamMapper.toPersistence({
          ...TeamMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TeamMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Team['id']): Promise<void> {
    await this.teamsRepository.softDelete(id);
  }
}
