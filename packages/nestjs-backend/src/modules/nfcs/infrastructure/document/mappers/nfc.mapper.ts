import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcSchemaClass } from '../entities/nfc.schema';

export class NfcMapper {
  static toDomain(raw: NfcSchemaClass): NFC {
    const nfc = new NFC();
    nfc.id = raw._id.toString();
    nfc.uid = raw.uid;
    nfc.nfcDetail = raw.nfcDetail;
    nfc.piccData = raw.piccData;
    nfc.fileData = raw.fileData;
    nfc.counter = raw.counter;
    nfc.status = raw.status;
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

  static toPersistence(nfc: NFC): NfcSchemaClass {
    const nfcEntity = new NfcSchemaClass();
    if (nfc.id && typeof nfc.id === 'string') {
      nfcEntity._id = nfc.id;
    }
    nfcEntity.uid = nfc.uid;
    nfcEntity.nfcDetail = nfc.nfcDetail;
    nfcEntity.piccData = nfc.piccData;
    nfcEntity.fileData = nfc.fileData;
    nfcEntity.counter = nfc.counter;
    nfcEntity.status = nfc.status;
    nfcEntity.encryptionMode = nfc.encryptionMode;
    nfcEntity.encryptedShareKey = nfc.encryptedShareKey;
    nfcEntity.createdAt = nfc.createdAt;
    nfcEntity.updatedAt = nfc.updatedAt;
    nfcEntity.deletedAt = nfc.deletedAt;
    nfcEntity.createdBy = nfc.createdBy;
    nfcEntity.updatedBy = nfc.updatedBy;
    nfcEntity.deletedBy = nfc.deletedBy;
    return nfcEntity;
  }
}
