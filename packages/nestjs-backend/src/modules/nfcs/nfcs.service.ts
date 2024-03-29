import { Injectable } from '@nestjs/common';
import { CreateNfcDto } from './dto/create-nfc.dto';
import { UpdateNfcDto } from './dto/update-nfc.dto';
import { NfcRepository } from './infrastructure/persistence/nfc.repository';
import { NFC } from './domain/nfc';
import { UserRepository } from '../users/infrastructure/persistence/user.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { SortNfcDto } from './dto/query-nfc.dto';

@Injectable()
export class NfcsService {
  constructor(
    private readonly nfcRepository: NfcRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async create(
    createNfcDto: CreateNfcDto,
    logedInUserId: string,
  ): Promise<NFC> {
    const clonedPayload = { ...createNfcDto };
    if (logedInUserId) {
      const logedInUser = await this.usersRepository.findOne({
        id: logedInUserId,
      });
      clonedPayload.createdBy = logedInUser;
      clonedPayload.updatedBy = logedInUser;
    }

    return this.nfcRepository.create(clonedPayload);
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortNfcDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<NFC[]> {
    return this.nfcRepository.findManyWithPagination({
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<NFC>): Promise<NullableType<NFC>> {
    return this.nfcRepository.findOne(fields);
  }

  async update(
    id: number,
    updateNfcDto: UpdateNfcDto,
    logedInUserId: string,
  ): Promise<NFC | null> {
    const clonedPayload = { ...updateNfcDto };
    if (logedInUserId) {
      const logedInUser = await this.usersRepository.findOne({
        id: logedInUserId,
      });
      clonedPayload.updatedBy = logedInUser;
    }
    return this.nfcRepository.update(id, clonedPayload);
  }

  async softDelete(id: NFC['id']): Promise<void> {
    await this.nfcRepository.softDelete(id);
  }
}
