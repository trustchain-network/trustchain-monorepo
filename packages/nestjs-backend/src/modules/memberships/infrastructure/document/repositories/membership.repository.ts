import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from 'src/utils/types/nullable.type';
import { MembershipSchemaClass } from '../entities/membership.schema';
import { Membership } from 'src/modules/memberships/domain/membership';
import { MembershipMapper } from '../mappers/membership.mapper';
import { MembershipRepository } from '../../persistence/membership.repository';

@Injectable()
export class MembershipsDocumentRepository implements MembershipRepository {
  constructor(
    @InjectModel(MembershipSchemaClass.name)
    private readonly membershipModel: Model<MembershipSchemaClass>,
  ) {}

  async create(data: Membership): Promise<Membership> {
    const persistenceModel = MembershipMapper.toPersistence(data);
    const createdPlan = new this.membershipModel(persistenceModel);
    const planObject = await createdPlan.save();
    return MembershipMapper.toDomain(planObject);
  }

  async findOne(
    fields: EntityCondition<Membership>,
  ): Promise<NullableType<Membership>> {
    if (fields.id) {
      const planObject = await this.membershipModel.findById(fields.id);
      return planObject ? MembershipMapper.toDomain(planObject) : null;
    }

    const planObject = await this.membershipModel.findOne(fields);
    return planObject ? MembershipMapper.toDomain(planObject) : null;
  }

  async findAll(): Promise<Membership[]> {
    const membershipObjects = await this.membershipModel.find();
    return membershipObjects.map((planObject) =>
      MembershipMapper.toDomain(planObject),
    );
  }

  async update(
    id: Membership['id'],
    payload: Partial<Membership>,
  ): Promise<Membership | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const planObject = await this.membershipModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return planObject ? MembershipMapper.toDomain(planObject) : null;
  }

  async softDelete(id: Membership['id']): Promise<void> {
    await this.membershipModel.deleteOne({
      _id: id,
    });
  }
}
