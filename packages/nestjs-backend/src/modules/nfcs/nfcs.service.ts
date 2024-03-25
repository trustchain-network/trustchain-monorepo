import { Injectable } from '@nestjs/common';
import { CreateNfcDto } from './dto/create-nfc.dto';
import { UpdateNfcDto } from './dto/update-nfc.dto';
import { NfcRepository } from './infrastructure/persistence/nfc.repository';
import { NFC } from './domain/nfc';

@Injectable()
export class NfcsService {
  constructor(private readonly nfcRepository: NfcRepository) {}

  async create(
    createNfcDto: CreateNfcDto,
    logedInUserId: string,
  ): Promise<NFC> {
    const clonedPayload = { ...createNfcDto };
    clonedPayload.createdBy = logedInUserId ?? null;
    clonedPayload.updatedBy = logedInUserId ?? null;

    return this.nfcRepository.create(clonedPayload);
  }

  async findAll() {
    return `This action returns all nfc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nfc`;
  }

  async update(
    id: number,
    updateNfcDto: UpdateNfcDto,
    logedInUserId: string,
  ): Promise<NFC | null> {
    const clonedPayload = { ...updateNfcDto };
    clonedPayload.updatedBy = logedInUserId ?? null;
    return this.nfcRepository.update(id, clonedPayload);
  }

  async softDelete(id: NFC['id']): Promise<void> {
    await this.nfcRepository.softDelete(id);
  }
}
