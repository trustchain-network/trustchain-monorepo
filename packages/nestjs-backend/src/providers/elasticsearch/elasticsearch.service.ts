import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class ElasticsearchService {
  private logger = new Logger(ElasticsearchService.name);

  constructor(private configService: ConfigService<AllConfigType>) {}
}
