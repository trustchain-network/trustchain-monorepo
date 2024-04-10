import { NfcScanFactoryService } from '#test/factory/nfcs-scan.factory.service';
import { NfcsFactoryService } from '#test/factory/nfcs.factory.service';
import { TestModule } from '#test/utils/test.module';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AddNfcScanEvent,
  AddNfcScanEventHandler,
} from 'src/modules/nfcs/cqrs/add-nfc-sacn.event';
import { NfcsModule } from 'src/modules/nfcs/nfcs.module';

describe('AddNfcScanEventHandler (unit)', () => {
  let moduleRef: TestingModule;
  let handler: AddNfcScanEventHandler;
  let nfcSacnFactory: NfcScanFactoryService;
  let nfcFactory: NfcsFactoryService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [TestModule, NfcsModule],
    }).compile();

    handler = moduleRef.get(AddNfcScanEventHandler);
    nfcSacnFactory = moduleRef.get(NfcScanFactoryService);
    nfcFactory = moduleRef.get(NfcsFactoryService);

    await nfcSacnFactory.clearTable();
    await nfcFactory.clearTable();
  });

  afterEach(async () => {
    await nfcSacnFactory.clearTable();
    await nfcFactory.clearTable();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('Should add scan for nfc', async () => {
    const nfc = await nfcFactory.create();
    await handler.handle(new AddNfcScanEvent({ nfcId: nfc.id }));

    const [count, scan] = await Promise.all([
      nfcSacnFactory.getCount(),
      nfcSacnFactory.getEntityByField({ nfcId: nfc.id }),
    ]);

    expect(count).toBe(1);
    expect(scan).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        nfcId: nfc.id,
      }),
    );
  });

  it('Should add scan for invalid Id', async () => {
    await handler.handle(
      new AddNfcScanEvent({ nfcId: '653f9a11-52fe-4c94-bf88-26d09c77bf36' }),
    );

    const scans = await nfcSacnFactory.getEntitiesByField({});

    expect(scans?.length).toBe(1);
    expect(scans[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        nfcId: null,
      }),
    );
  });

  it('Should add scan without nfc id', async () => {
    await handler.handle(new AddNfcScanEvent({ nfcId: undefined }));

    const scans = await nfcSacnFactory.getEntitiesByField({});

    expect(scans?.length).toBe(1);
    expect(scans[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        nfcId: null,
      }),
    );
  });
});
