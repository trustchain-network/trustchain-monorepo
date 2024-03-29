import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcEntity } from '../entities/nfc.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { NfcDetailEntity } from 'src/modules/nfc-details/infrastructure/persistence/relational/entities/nfc-detail.entity';
import { UserMapper } from 'src/modules/users/infrastructure/persistence/relational/mappers/user.mapper';
import { NfcDetailMapper } from 'src/modules/nfc-details/infrastructure/persistence/relational/mappers/nfc-detail.mapper';
import { User } from 'src/modules/users/domain/user';
import { NfcDetail } from 'src/modules/nfc-details/domain/nfc-detail';

export class NfcMapper {
  static toDomain(raw: NfcEntity): NFC {
    return Object.assign(new NFC(), raw, {
      ...(raw.detail && {
        detail: NfcDetailMapper.toDomain(raw.detail as NfcDetailEntity),
      }),
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

  static toPersistence(nfc: NFC): NfcEntity {
    return Object.assign(new NfcEntity(), nfc, {
      ...(nfc.detail && {
        detail: NfcDetailMapper.toPersistence(nfc.detail as NfcDetail),
      }),
      ...(nfc.createdBy && {
        createdBy: UserMapper.toPersistence(nfc.createdBy as User),
      }),
      ...(nfc.updatedBy && {
        updatedBy: UserMapper.toPersistence(nfc.updatedBy as User),
      }),
      ...(nfc.deletedBy && {
        deletedBy: UserMapper.toPersistence(nfc.deletedBy as User),
      }),
    });
  }
}
