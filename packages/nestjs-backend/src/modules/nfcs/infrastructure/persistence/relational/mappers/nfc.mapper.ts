import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcEntity } from '../entities/nfc.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { NfcStatusEnum } from 'src/modules/nfc-statuses';
import { TagStatusEnum } from 'src/modules/nfc-statuses/tag-statuses.enum';
// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';

export class NfcMapper {
  static toDomain(raw: NfcEntity): NFC {
    const nfc = new NFC();
    nfc.id = raw.id;
    nfc.uid = raw.uid;
    nfc.nfcDetail = raw.nfcDetail;
    nfc.piccData = raw.piccData;
    nfc.fileData = raw.fileData;
    nfc.counter = raw.counter;
    nfc.status = raw.status;
    nfc.tagStatus = raw.tagStatus;
    nfc.encryptionMode = raw.encryptionMode;
    nfc.encryptedShareKey = raw.encryptedShareKey;
    nfc.createdAt = raw.createdAt;
    nfc.updatedAt = raw.updatedAt;
    nfc.deletedAt = raw.deletedAt;
    nfc.createdBy = raw.createdBy;
    nfc.updatedBy = raw.updatedBy;
    nfc.deletedBy = raw.deletedBy;
    return nfc;
  }

  static toPersistence(nfc: NFC): NfcEntity {
    let status: NfcStatusEnum = 1;
    let tagStatus: TagStatusEnum = 1;
    let createdByuser: UserEntity | undefined = undefined;
    let updatedByuser: UserEntity | undefined = undefined;
    let deletedByuser: UserEntity | undefined = undefined;

    if (nfc.createdBy) {
      createdByuser = new UserEntity();
      createdByuser.id = nfc.createdBy.id;
    }

    if (nfc.updatedBy) {
      updatedByuser = new UserEntity();
      updatedByuser.id = nfc.updatedBy.id;
    }

    if (nfc.deletedBy) {
      deletedByuser = new UserEntity();
      deletedByuser.id = nfc.deletedBy.id;
    }

    const nfcEntity = new NfcEntity();
    if (nfc.id && typeof nfc.id === 'string') {
      nfcEntity.id = nfc.id;
    }
    nfcEntity.uid = nfc.uid;
    if (nfc.nfcDetail && typeof nfc.nfcDetail === 'string') {
      nfcEntity.nfcDetail = nfc.nfcDetail;
    }

    nfcEntity.piccData = nfc.piccData;
    nfcEntity.fileData = nfc.fileData;
    nfcEntity.counter = nfc.counter;
    nfcEntity.status = status;
    nfcEntity.tagStatus = tagStatus;
    nfcEntity.encryptionMode = nfc.encryptionMode;
    nfcEntity.encryptedShareKey = nfc.encryptedShareKey;

    nfcEntity.createdAt = nfc.createdAt;
    nfcEntity.updatedAt = nfc.updatedAt;
    nfcEntity.deletedAt = nfc.deletedAt;
    nfcEntity.createdBy = createdByuser;
    nfcEntity.updatedBy = updatedByuser;
    nfcEntity.deletedBy = deletedByuser;
    return nfcEntity;
  }
}
