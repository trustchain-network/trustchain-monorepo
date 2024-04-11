import { BaseFactoryService } from './base.factory.service';
import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NfcEntity } from 'src/modules/nfcs/infrastructure/persistence/relational/entities/nfc.entity';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcStatusEnum } from 'src/modules/nfcs/enums/nfc-statuses.enum';
import { TagStatusEnum } from 'src/modules/nfcs/enums/tag-statuses.enum';
import { EncryptionMode } from 'src/modules/nfcs/enums/encryption-mode.enum';

const hex = (): string =>
  faker.string.hexadecimal({
    prefix: '',
    length: 16,
    casing: 'upper',
  });

export class NfcsFactoryService extends BaseFactoryService<NfcEntity> {
  constructor(
    @InjectRepository(NfcEntity)
    protected repository: Repository<NfcEntity>,
  ) {
    super();
  }

  protected buildEntity(data?: Partial<NFC>): NfcEntity {
    return this.repository.create({
      counter: faker.number.int({ min: 0, max: 30 }),
      uid: hex(),
      piccData: hex(),
      fileData: hex(),
      encryptedShareKey: hex(),
      status: faker.helpers.enumValue(NfcStatusEnum),
      tagStatus: faker.helpers.enumValue(TagStatusEnum),
      encryptionMode: faker.helpers.enumValue(EncryptionMode),
      ...data,
    });
  }
}
