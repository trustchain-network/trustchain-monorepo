import { TSDMResponse } from 'src/providers/sdm/types';
import { ITagDataEncrypted } from 'src/providers/sdm/dto/tag-data-encrypted.dto';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { EncryptionMode } from 'src/modules/nfcs/enums/encryption-mode.enum';

export type TSdmData = Partial<TSDMResponse & ITagDataEncrypted>;

export type TSdmNfcData = Partial<
  Pick<NFC, 'piccData' | 'uid' | 'encryptionMode' | 'counter' | 'fileData'>
>;

export class SdmMapper {
  static toDomain(sdm: TSdmData): TSdmNfcData {
    return {
      // req fields
      ...(sdm.picc_data && { piccData: sdm.picc_data }),
      // resp fields
      ...(sdm.uid && { uid: sdm.uid }),
      ...(sdm.enc_mode && { encryptionMode: sdm.enc_mode as EncryptionMode }),
      ...(sdm.read_ctr && { counter: sdm.read_ctr }),
      ...(sdm.file_data && { fileData: sdm.file_data }),
    };
  }
}
