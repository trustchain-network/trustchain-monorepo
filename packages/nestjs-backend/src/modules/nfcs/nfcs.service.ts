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
import { SdmService } from 'src/providers/sdm/sdm.service';
import { ITagDataEncrypted } from 'src/providers/sdm/dto/tag-data-encrypted.dto';
import { ITagData } from 'src/providers/sdm/dto/tag-data.dto';
import { TSDMResponse } from 'src/providers/sdm/types';
import { NotFoundError } from 'src/utils/errors';
import { EventBus } from '@nestjs/cqrs';
import { UpdateNfcEvent } from './cqrs/update-nfc.event';

@Injectable()
export class NfcsService {
  constructor(
    private readonly nfcRepository: NfcRepository,
    private readonly usersRepository: UserRepository,
    private readonly sdm: SdmService,
    private readonly eventBus: EventBus,
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
    id: string,
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

  async getValidatedData(
    id: string,
    data: ITagData | ITagDataEncrypted,
    type: 'tagpt' | 'tag' | 'tagtt',
  ): Promise<TSDMResponse> {
    const nfc = await this.findOne({ id });
    if (!nfc) {
      throw new NotFoundError();
    }

    const sdmData = await this.sdm.getTag(data, type);

    this.eventBus.publish(new UpdateNfcEvent({ nfc, sdmData }));

    return sdmData;
  }
}
