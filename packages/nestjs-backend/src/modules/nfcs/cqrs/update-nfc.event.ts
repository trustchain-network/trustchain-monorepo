import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { NFC } from '../domain/nfc';
import {
  SdmMapper,
  TSdmData,
} from '../infrastructure/persistence/relational/mappers/sdm.mappers';
import { NfcRepository } from '../infrastructure/persistence/nfc.repository';

export type TUpdateNfcInput = {
  nfc: NFC;
  sdmData: TSdmData;
};

export class UpdateNfcEvent implements IEvent {
  constructor(readonly payload: TUpdateNfcInput) {}
}

@EventsHandler(UpdateNfcEvent)
export class UpdateNfcEventHandler implements IEventHandler<UpdateNfcEvent> {
  constructor(private readonly repo: NfcRepository) {}

  async handle({ payload: { nfc, sdmData } }: UpdateNfcEvent): Promise<void> {
    if (
      !sdmData ||
      !Object.keys(sdmData).length ||
      !sdmData.read_ctr ||
      nfc.counter >= sdmData.read_ctr
    ) {
      return;
    }

    const updateData = SdmMapper.toDomain(sdmData);
    if (Object.keys(updateData).some((key) => nfc[key] !== updateData[key])) {
      await this.repo.update(nfc.id, updateData);
    }
  }
}
