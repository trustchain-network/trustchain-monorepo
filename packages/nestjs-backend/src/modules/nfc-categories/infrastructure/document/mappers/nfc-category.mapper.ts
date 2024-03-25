import { NfcCategory } from 'src/modules/nfc-categories/domain/nfc-category';
import { NfcCategorySchemaClass } from '../entities/nfc-category.schema';

export class NfcCategoryMapper {
  static toDomain(raw: NfcCategorySchemaClass): NfcCategory {
    const nfcCategory = new NfcCategory();
    nfcCategory.id = raw._id.toString();
    nfcCategory.name = raw.name;
    nfcCategory.description = raw.description;
    nfcCategory.createdAt = raw.createdAt;
    nfcCategory.updatedAt = raw.updatedAt;
    nfcCategory.deletedAt = raw.deletedAt;
    nfcCategory.createdBy = raw.createdBy;
    nfcCategory.updatedBy = raw.updatedBy;
    nfcCategory.deletedBy = raw.deletedBy;
    return nfcCategory;
  }

  static toPersistence(nfcCategory: NfcCategory): NfcCategorySchemaClass {
    const nfcCategoryEntity = new NfcCategorySchemaClass();

    if (nfcCategory.id && typeof nfcCategory.id === 'string') {
      nfcCategoryEntity._id = nfcCategory.id;
    }

    nfcCategoryEntity.name = nfcCategory.name;
    if (
      nfcCategory.description &&
      typeof nfcCategory.description === 'string'
    ) {
      nfcCategoryEntity.description = nfcCategory.description;
    }
    nfcCategoryEntity.createdAt = nfcCategory.createdAt;
    nfcCategoryEntity.updatedAt = nfcCategory.updatedAt;
    nfcCategoryEntity.deletedAt = nfcCategory.deletedAt;
    nfcCategoryEntity.createdBy = nfcCategory.createdBy;
    nfcCategoryEntity.updatedBy = nfcCategory.updatedBy;
    nfcCategoryEntity.deletedBy = nfcCategory.deletedBy;

    return nfcCategoryEntity;
  }
}
