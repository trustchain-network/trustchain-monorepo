import { HttpService } from '../http/http.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITagDataEncrypted } from './dto/tag-data-encrypted.dto';
import { ITagData } from './dto/tag-data.dto';
import { TSDMResponse } from './types';
import { UnprocessableEntityError } from 'src/utils/errors';

@Injectable()
export class SdmService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // NTAG 424 DNA: Plaintext tag UID, read counter mirroring with SDMMAC (CMAC)
  getTagUID(data: ITagData): Promise<TSDMResponse> {
    return this.getTag(data, 'tagpt');
  }

  getTagEncrypted(data: ITagDataEncrypted): Promise<TSDMResponse> {
    return this.getTag(data, 'tag');
  }

  getTagTamper(data: ITagDataEncrypted): Promise<TSDMResponse> {
    return this.getTag(data, 'tagtt');
  }

  getTag(
    data: ITagData | ITagDataEncrypted,
    route: 'tagpt' | 'tag' | 'tagtt',
  ): Promise<TSDMResponse> {
    return this.httpService
      .get<TSDMResponse>(
        `${this.configService.getOrThrow('app.sdmDomain', { infer: true })}/api/${route}`,
        data,
      )
      .catch((): never => {
        throw new UnprocessableEntityError('tagValidationFailed');
      });
  }
}
