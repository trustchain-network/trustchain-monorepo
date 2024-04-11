import { BaseFactoryService } from './base.factory.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NfcScan } from 'src/modules/nfc-scan/entities/nfc-scan.entity';

export class NfcScanFactoryService extends BaseFactoryService<NfcScan> {
  constructor(
    @InjectRepository(NfcScan)
    protected repository: Repository<NfcScan>,
  ) {
    super();
  }

  protected buildEntity(data?: Partial<NfcScan>): NfcScan {
    return this.repository.create({
      ...data,
    });
  }
}
