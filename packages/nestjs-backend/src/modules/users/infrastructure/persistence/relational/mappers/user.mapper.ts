import { FileEntity } from 'src/modules/files/infrastructure/persistence/relational/entities/file.entity';
import { MembershipEntity } from 'src/modules/memberships/infrastructure/persistence/relational/entities/membership.entity';
import { RoleEntity } from 'src/modules/roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from 'src/modules/statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileMapper } from 'src/modules/files/infrastructure/persistence/relational/mappers/file.mapper';
import { User } from 'src/modules/users/domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.firstName = raw.firstName;
    user.lastName = raw.lastName;
    if (raw.photo) {
      user.photo = FileMapper.toDomain(raw.photo);
    }
    user.role = raw.role;
    user.countryCode = raw.countryCode;
    user.twoFactor = raw.twoFactor;
    user.twoFactorPhone = raw.twoFactorPhone;
    user.twoFactorSecret = raw.twoFactorSecret;
    user.status = raw.status;
    user.membership = raw.membership;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    user.createdBy = raw.createdBy;
    user.updatedBy = raw.updatedBy;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    let role: RoleEntity | undefined = undefined;
    //let team: Team | undefined = undefined;

    if (user.role) {
      role = new RoleEntity();
      role.id = user.role.id;
    }

    let photo: FileEntity | undefined | null = undefined;

    if (user.photo) {
      photo = new FileEntity();
      photo.id = user.photo.id;
      photo.path = user.photo.path;
    } else if (user.photo === null) {
      photo = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (user.status) {
      status = new StatusEntity();
      status.id = user.status.id;
    }

    let membership: MembershipEntity | undefined = undefined;

    let createdBy: UserEntity | undefined = new UserEntity();
    if (user.createdBy) {
      createdBy.id = user.createdBy.id;
    }
    let updatedBy: UserEntity | undefined = new UserEntity();
    if (user.updatedBy) {
      updatedBy.id = user.updatedBy.id;
    }
    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'string') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.socialId = user.socialId;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.photo = photo;
    userEntity.role = role;
    userEntity.countryCode = user.countryCode;
    userEntity.twoFactor = user.twoFactor;
    userEntity.twoFactorPhone = user.twoFactorPhone;
    userEntity.twoFactorSecret = user.twoFactorSecret;
    userEntity.status = status;
    userEntity.membership = membership;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    userEntity.createdBy = createdBy;
    userEntity.updatedBy = updatedBy;
    return userEntity;
  }
}
