import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { NfcGroupEntity } from '../entities/nfc-group.entity';
import { NfcGroup } from 'src/modules/nfc-groups/domain/nfc-group';

export class NfcGroupMapper {
  static toDomain(raw: NfcGroupEntity): NfcGroup {
    const nfcGroup = new NfcGroup();
    nfcGroup.id = raw.id;
    nfcGroup.name = raw.name;
    nfcGroup.description = raw.description;
    nfcGroup.publicKey = raw.publicKey;
    nfcGroup.privateKey = raw.privateKey;
    nfcGroup.createdAt = raw.createdAt;
    nfcGroup.updatedAt = raw.updatedAt;
    nfcGroup.deletedAt = raw.deletedAt;
    nfcGroup.createdBy = raw.createdBy;
    nfcGroup.updatedBy = raw.updatedBy;
    nfcGroup.deletedBy = raw.deletedBy;
    return nfcGroup;
  }

  static toPersistence(nfcGroup: NfcGroup): NfcGroupEntity {
    const nfcGroupEntity = new NfcGroupEntity();
    if (nfcGroup.id && typeof nfcGroup.id === 'string') {
      nfcGroupEntity.id = nfcGroup.id;
    }
    nfcGroupEntity.name = nfcGroup.name;

    nfcGroupEntity.createdAt = nfcGroup.createdAt;
    nfcGroupEntity.updatedAt = nfcGroup.updatedAt;
    nfcGroupEntity.deletedAt = nfcGroup.deletedAt;
    ['createdBy', 'updatedBy', 'deletedBy'].forEach((prop) => {
      if (nfcGroup[prop]) {
        nfcGroupEntity[prop] = new UserEntity();
        nfcGroupEntity[prop].id = nfcGroup[prop].id;
      }
    });
    return nfcGroupEntity;
  }
}
