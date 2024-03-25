import { Membership } from 'src/modules/memberships/domain/membership';
import { MembershipEntity } from '../entities/membership.entity';

export class MembershipMapper {
  static toDomain(raw: MembershipEntity): Membership {
    const membership = new Membership();
    membership.id = raw.id;
    membership.status = raw.status;
    membership.createdAt = raw.createdAt;
    membership.updatedAt = raw.updatedAt;
    membership.deletedAt = raw.deletedAt;
    membership.createdBy = raw.createdBy;
    membership.updatedBy = raw.updatedBy;
    membership.deletedBy = raw.deletedBy;
    return membership;
  }

  static toPersistence(membership: Membership): MembershipEntity {
    const membershipEntity = new MembershipEntity();
    if (membership.id && typeof membership.id === 'string') {
      membershipEntity.id = membership.id;
    }

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
