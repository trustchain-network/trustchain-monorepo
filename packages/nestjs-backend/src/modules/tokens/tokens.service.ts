import { Injectable } from '@nestjs/common';
// import cryptoRandomString from 'crypto-random-string';
import { v4 } from 'uuid';

@Injectable()
export class TokensService {
  /**
   * Generate a UUID
   */
  generateUuid() {
    return v4();
  }

  /**
   * Generate a cryptographically strong random string
   * @param length - Length of returned string
   * @param charactersOrType - Characters or one of the supported types
   */
  // async generateRandomString(
  //   length = 32,
  //   charactersOrType = 'alphanumeric',
  // ): Promise<string> {
  //   if (
  //     [
  //       'hex',
  //       'base64',
  //       'url-safe',
  //       'numeric',
  //       'distinguishable',
  //       'ascii-printable',
  //       'alphanumeric',
  //     ].includes(charactersOrType)
  //   )
  //     return cryptoRandomString({
  //       length,
  //       type: charactersOrType as
  //         | 'hex'
  //         | 'base64'
  //         | 'url-safe'
  //         | 'numeric'
  //         | 'distinguishable'
  //         | 'ascii-printable'
  //         | 'alphanumeric',
  //     });
  //   return cryptoRandomString({ length, characters: charactersOrType });
  // }
}
