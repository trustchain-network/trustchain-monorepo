import { Injectable } from '@nestjs/common';
import { NfcDetail } from './domain/nfc-detail';
import { NullableType } from 'src/utils/types/nullable.type';
import { NfcDetailRepository } from './infrastructure/persistence/nfc-details.repository';
import { UsersService } from '../users/users.service';
import { DeepPartial } from 'typeorm';
import { CreateNfcDetailsDto } from './dto/create-nfc-details.dto';

@Injectable()
export class NfcDetailsService {
  // private logger = new Logger(NfcDetailsService.name);

  constructor(
    private readonly nfcDetailRepository: NfcDetailRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createNfcDetailDto: CreateNfcDetailsDto,
    logedInUserId?: string,
  ): Promise<any> {
    const clonedPayload = {
      ...createNfcDetailDto,
    };

    if (logedInUserId) {
      const logedInUser = await this.usersService.findOne({
        id: logedInUserId,
      });
      clonedPayload.createdBy = logedInUser;
      clonedPayload.updatedBy = logedInUser;
    }

    return this.nfcDetailRepository.create(clonedPayload);
  }

  findOne(fields: any): Promise<NullableType<NfcDetail>> {
    return this.nfcDetailRepository.findOne(fields);
  }

  async update(
    id: NfcDetail['id'],
    payload: DeepPartial<NfcDetail>,
    logedInUserId?: string,
  ): Promise<any> {
    const clonedPayload = { ...payload };

    if (logedInUserId) {
      const logedInUser = await this.usersService.findOne({
        id: logedInUserId,
      });
      clonedPayload.updatedBy = logedInUser;
    }
    return this.nfcDetailRepository.update(id, payload);
  }

  async softDelete(id: NfcDetail['id']): Promise<void> {
    return this.nfcDetailRepository.softDelete(id);
  }
}
