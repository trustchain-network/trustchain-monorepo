import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MembershipRepository } from '../../membership.repository';
import { MembershipEntity } from '../entities/membership.entity';
import { MembershipMapper } from '../mappers/membership.mapper';
import { Membership } from 'src/modules/memberships/domain/membership';

@Injectable()
export class MembershipsRelationalRepository implements MembershipRepository {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
  ) {}

  async create(data: Membership): Promise<Membership> {
    const persistenceModel = MembershipMapper.toPersistence(data);
    const newEntity = await this.membershipRepository.save(
      this.membershipRepository.create(persistenceModel),
    );
    return MembershipMapper.toDomain(newEntity);
  }

  async findOne(
    fields: EntityCondition<Membership>,
  ): Promise<NullableType<Membership>> {
    const entity = await this.membershipRepository.findOne({
      where: fields as FindOptionsWhere<MembershipEntity>,
    });

    return entity ? MembershipMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Membership[]> {
    const entities = await this.membershipRepository.find();
    return entities.map((entity) => MembershipMapper.toDomain(entity));
  }

  async update(
    id: Membership['id'],
    payload: Partial<Membership>,
  ): Promise<Membership> {
    const entity = await this.membershipRepository.findOne({
      where: { id: id.toString() },
    });

    if (!entity) {
      throw new Error('Membership not found');
    }

    const updatedEntity = await this.membershipRepository.save(
      this.membershipRepository.create(
        MembershipMapper.toPersistence({
          ...MembershipMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MembershipMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Membership['id']): Promise<void> {
    await this.membershipRepository.softDelete(id);
  }
}
