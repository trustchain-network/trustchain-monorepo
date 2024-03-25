import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Team } from 'src/modules/teams/domain/team';
import { TeamRepository } from '../../team.repository';
import { TeamSchemaClass } from '../entities/team.schema';
import { TeamMapper } from '../mappers/team.mapper';

@Injectable()
export class TeamsDocumentRepository implements TeamRepository {
  constructor(
    @InjectModel(TeamSchemaClass.name)
    private readonly teamsModel: Model<TeamSchemaClass>,
  ) {}

  async create(data: Team): Promise<Team> {
    const persistenceModel = TeamMapper.toPersistence(data);
    const createdTeam = new this.teamsModel(persistenceModel);
    const teamObject = await createdTeam.save();
    return TeamMapper.toDomain(teamObject);
  }

  async findOne(fields: EntityCondition<Team>): Promise<NullableType<Team>> {
    if (fields.id) {
      const teamObject = await this.teamsModel.findById(fields.id);
      return teamObject ? TeamMapper.toDomain(teamObject) : null;
    }

    const teamObject = await this.teamsModel.findOne(fields);
    return teamObject ? TeamMapper.toDomain(teamObject) : null;
  }

  async update(id: Team['id'], payload: Partial<Team>): Promise<Team | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const teamObject = await this.teamsModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return teamObject ? TeamMapper.toDomain(teamObject) : null;
  }

  async softDelete(id: Team['id']): Promise<void> {
    await this.teamsModel.deleteOne({
      _id: id,
    });
  }
}
