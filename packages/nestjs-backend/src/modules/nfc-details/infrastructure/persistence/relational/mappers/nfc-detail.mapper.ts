import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';
import { NfcDetailEntity } from '../entities/nfc-detail.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from 'src/modules/users/infrastructure/persistence/relational/mappers/user.mapper';
import { User } from 'src/modules/users/domain/user';

export class NfcDetailMapper {
  static toDomain(raw: NfcDetailEntity): NfcDetail {
    return Object.assign(new NfcDetail(), raw, {
      ...(raw.createdBy && {
        createdBy: UserMapper.toDomain(raw.createdBy as UserEntity),
      }),
      ...(raw.updatedBy && {
        updatedBy: UserMapper.toDomain(raw.updatedBy as UserEntity),
      }),
      ...(raw.deletedBy && {
        deletedBy: UserMapper.toDomain(raw.deletedBy as UserEntity),
      }),
    });
  }

  static toPersistence(nfcDetail: NfcDetail): NfcDetailEntity {
    return Object.assign(new NfcDetailEntity(), nfcDetail, {
      ...(nfcDetail.createdBy && {
        createdBy: UserMapper.toPersistence(nfcDetail.createdBy as User),
      }),
      ...(nfcDetail.updatedBy && {
        updatedBy: UserMapper.toPersistence(nfcDetail.updatedBy as User),
      }),
      ...(nfcDetail.deletedBy && {
        deletedBy: UserMapper.toPersistence(nfcDetail.deletedBy as User),
      }),
    });
  }
}
