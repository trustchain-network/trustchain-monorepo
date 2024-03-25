// import { NfcDetail } from 'src/nfc-details/domain/nfc-detail';
// import { NfcDetailEntity } from '../entities/nfc-detail.entity';
// import { IcTypeEntity } from 'src/ic-types/infrastructure/persistence/relational/entities/ic-type.entity';

// export class NfcDetailMapper {
//   static toDomain(raw: NfcDetailEntity): NfcDetail {
//     const nfcDetail = new NfcDetail();
//     nfcDetail.id = raw.id;
//     nfcDetail.icManifacturer = raw.icManifacturer;
//     nfcDetail.icType = raw.icType;
//     nfcDetail.memoryInfo = raw.memoryInfo;
//     nfcDetail.technologies = raw.technologies;
//     nfcDetail.majorVersion = raw.majorVersion;
//     nfcDetail.minorVersion = raw.minorVersion;

//     nfcDetail.createdAt = raw.createdAt;
//     nfcDetail.updatedAt = raw.updatedAt;
//     nfcDetail.deletedAt = raw.deletedAt;
//     nfcDetail.createdBy = raw.createdBy;
//     nfcDetail.updatedBy = raw.updatedBy;
//     nfcDetail.deletedBy = raw.deletedBy;
//     return nfcDetail;
//   }

//   static toPersistence(nfcDetail: NfcDetail): NfcDetailEntity {
//     let icType: IcTypeEntity | undefined = undefined;

//     if (nfcDetail.icType) {
//       icType = new IcTypeEntity();
//       icType.id = nfcDetail.icType.id;
//     }

//     const nfcDetailEntity = new NfcDetailEntity();
//     if (nfcDetail.id && typeof nfcDetail.id === 'string') {
//       nfcDetailEntity.id = nfcDetail.id;
//     }
//     nfcDetailEntity.icManifacturer = nfcDetail.icManifacturer;
//     nfcDetailEntity.memoryInfo = nfcDetail.memoryInfo;
//     nfcDetailEntity.technologies = nfcDetail.technologies;
//     nfcDetailEntity.majorVersion = nfcDetail.majorVersion;
//     nfcDetailEntity.minorVersion = nfcDetail.minorVersion;

//     nfcDetailEntity.createdAt = nfcDetail.createdAt;
//     nfcDetailEntity.updatedAt = nfcDetail.updatedAt;
//     nfcDetailEntity.deletedAt = nfcDetail.deletedAt;
//     nfcDetailEntity.createdBy = nfcDetail.createdBy;
//     nfcDetailEntity.updatedBy = nfcDetail.updatedBy;
//     nfcDetailEntity.deletedBy = nfcDetail.deletedBy;
//     return nfcDetailEntity;
//   }
// }
