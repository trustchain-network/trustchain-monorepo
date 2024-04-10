import { EventBus, EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { NfcsService } from 'src/modules/nfcs/nfcs.service';
import { NfcScanService } from 'src/modules/nfc-scan/nfc-scan.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export type TAddNfcScanEvent = {
  nfcId: string | undefined;
};

export class AddNfcScanEvent implements IEvent {
  constructor(readonly payload: TAddNfcScanEvent) {}
}

@EventsHandler(AddNfcScanEvent)
export class AddNfcScanEventHandler implements IEventHandler<AddNfcScanEvent> {
  constructor(
    private readonly nfcService: NfcsService,
    private readonly sacnService: NfcScanService,
  ) {}

  async handle({ payload: { nfcId: id } }: AddNfcScanEvent): Promise<void> {
    const nfc = await (id
      ? this.nfcService.findOne({ id }).catch(() => null)
      : Promise.resolve(null));

    await this.sacnService.add(nfc || null);
  }
}

@Injectable()
export class AddNfcScanMiddleware implements NestMiddleware {
  constructor(private readonly eventBus: EventBus) {}

  use(req, _res, next: NextFunction) {
    this.eventBus.publish(new AddNfcScanEvent({ nfcId: req?.params?.id }));

    next();
  }
}
