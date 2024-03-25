import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SdmService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getSDMDomain(): String {
    return this.configService.getOrThrow<String>('SDM_DOMAIN');
  }

  // NTAG 424 DNA: Plaintext tag UID, read counter mirroring with SDMMAC (CMAC)
  getTagUID(uid: String, ctr: String, cmac: String): any {
    return this.httpService.get(
      `${this.getSDMDomain}/api/tagpt?uid=${uid}&ctr=${ctr}&cmac=${cmac}`,
    );
  }

  getTagEncrypted(picc_data: String, enc: String, cmac: String): any {
    return this.httpService.get(
      `${this.getSDMDomain}/api/tag?picc_data=${picc_data}&enc=${enc}&cmac=${cmac}`,
    );
  }

  getTagTamper(picc_data: String, enc: String, cmac: String): any {
    return this.httpService.get(
      `${this.getSDMDomain}/api/tagtt?picc_data=${picc_data}&enc=${enc}&cmac=${cmac}`,
    );
  }
}
