import { Key } from 'src/providers/keys/domain/key';
import { KeySchemaClass } from '../entities/key.schema';

export class KeyMapper {
  static toDomain(raw: KeySchemaClass): Key {
    const key = new Key();
    key.id = raw._id.toString();
    key.key = raw.key;
    key.publicKey = raw.publicKey;
    key.createdAt = raw.createdAt;
    key.updatedAt = raw.updatedAt;
    key.deletedAt = raw.deletedAt;
    // key.createdBy = raw.createdBy;
    // key.updatedBy = raw.updatedBy;
    // key.deletedBy = raw.deletedBy;
    return key;
  }

  static toPersistence(key: Key): KeySchemaClass {
    const keyEntity = new KeySchemaClass();
    if (key.id && typeof key.id === 'string') {
      keyEntity._id = key.id;
    }
    if (key.key && typeof key.key === 'string') {
      keyEntity.key = key.key;
    }
    if (key.publicKey && typeof key.publicKey === 'string') {
      keyEntity.publicKey = key.publicKey;
    }
    keyEntity.createdAt = key.createdAt;
    keyEntity.updatedAt = key.updatedAt;
    keyEntity.deletedAt = key.deletedAt;
    // keyEntity.createdBy = key.createdBy;
    // keyEntity.updatedBy = key.updatedBy;
    // keyEntity.deletedBy = key.deletedBy;
    return keyEntity;
  }
}
