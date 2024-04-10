import { Injectable } from '@nestjs/common';
import { NFC } from '../nfcs/domain/nfc';
import { InjectRepository } from '@nestjs/typeorm';
import { NfcScan } from './entities/nfc-scan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NfcScanService {
  constructor(
    @InjectRepository(NfcScan)
    private readonly repo: Repository<NfcScan>,
  ) {}

  add(nfc: Pick<NFC, 'id'> | null): Promise<NfcScan> {
    return this.repo.save(this.repo.create({ nfc }));
  }
}
