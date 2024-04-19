import { Key } from 'src/providers/keys/domain/key';
import { KeyEntity } from '../entities/key.entity';

export class KeyMapper {
  static toDomain(raw: KeyEntity): Key {
    const key = new Key();
    key.id = raw.id;
    key.key = raw.key;
    key.publicKey = raw.publicKey;
    key.subscriptionId = raw.subscriptionId;
    key.userId = raw.userId;
    key.createdAt = raw.createdAt;
    key.updatedAt = raw.updatedAt;
    key.deletedAt = raw.deletedAt;
    // key.createdBy = raw.createdBy;
    // key.updatedBy = raw.updatedBy;
    // key.deletedBy = raw.deletedBy;
    return key;
  }

  static toPersistence(key: Key): KeyEntity {
    const keyEntity = new KeyEntity();
    if (key.id && typeof key.id === 'string') {
      keyEntity.id = key.id;
    }
    if (key.publicKey && typeof key.publicKey === 'string') {
      keyEntity.publicKey = key.publicKey;
    }
    keyEntity.key = key.key;
    keyEntity.subscriptionId = key.subscriptionId;
    keyEntity.userId = key.userId;
    keyEntity.createdAt = key.createdAt;
    keyEntity.updatedAt = key.updatedAt;
    keyEntity.deletedAt = key.deletedAt;
    // keyEntity.createdBy = key.createdBy;
    // keyEntity.updatedBy = key.updatedBy;
    // keyEntity.deletedBy = key.deletedBy;
    return keyEntity;
  }
}
