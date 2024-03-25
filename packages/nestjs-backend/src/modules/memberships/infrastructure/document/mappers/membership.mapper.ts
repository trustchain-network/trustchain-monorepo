import { Membership } from 'src/modules/memberships/domain/membership';
import { MembershipSchemaClass } from '../entities/membership.schema';

export class MembershipMapper {
  static toDomain(raw: MembershipSchemaClass): Membership {
    const membership = new Membership();
    membership.id = raw._id.toString();
    // membership.user = raw.user;
    // membership.plan = raw.plan;
    membership.status = raw.status;
    membership.createdAt = raw.createdAt;
    membership.updatedAt = raw.updatedAt;
    membership.deletedAt = raw.deletedAt;
    membership.createdBy = raw.createdBy;
    membership.updatedBy = raw.updatedBy;
    membership.deletedBy = raw.deletedBy;
    return membership;
  }

  static toPersistence(membership: Membership): MembershipSchemaClass {
    const membershipEntity = new MembershipSchemaClass();
    if (membership.id && typeof membership.id === 'string') {
      membershipEntity._id = membership.id;
    }
    // if (membership.user && typeof membership.user === 'string') {
    //   membershipEntity.user = membership.user;
    // }
    // if (membership.plan && typeof membership.plan === 'string') {
    //   membershipEntity.plan = membership.plan;
    // }
    if (membership.status && typeof membership.status === 'string') {
      membershipEntity.status = membership.status;
    }
    membershipEntity.createdAt = membership.createdAt;
    membershipEntity.updatedAt = membership.updatedAt;
    membershipEntity.deletedAt = membership.deletedAt;
    if (membership.createdBy && typeof membership.createdBy === 'string') {
      membershipEntity.createdBy = membership.createdBy;
    }
    if (membership.updatedBy && typeof membership.updatedBy === 'string') {
      membershipEntity.updatedBy = membership.updatedBy;
    }
    if (membership.deletedBy && typeof membership.deletedBy === 'string') {
      membershipEntity.deletedBy = membership.deletedBy;
    }
    return membershipEntity;
  }
}
