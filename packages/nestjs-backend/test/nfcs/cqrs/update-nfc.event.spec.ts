import { NfcsFactoryService } from '#test/factory/nfcs.factory.service';
import { TestModule } from '#test/utils/test.module';
import { Test, TestingModule } from '@nestjs/testing';
import {
  UpdateNfcEvent,
  UpdateNfcEventHandler,
} from 'src/modules/nfcs/cqrs/update-nfc.event';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { EncryptionMode } from 'src/modules/nfcs/enums/encryption-mode.enum';
import { NfcEntity } from 'src/modules/nfcs/infrastructure/persistence/relational/entities/nfc.entity';
import { TSdmData } from 'src/modules/nfcs/infrastructure/persistence/relational/mappers/sdm.mappers';
import { NfcsModule } from 'src/modules/nfcs/nfcs.module';

type TTestHandlerInput = {
  nfcData: Partial<NfcEntity>;
  sdmData: TSdmData;
  updatedFileds: Partial<NFC>;
};
describe('UpdateNfcEventHandler (unit)', () => {
  let moduleRef: TestingModule;
  let handler: UpdateNfcEventHandler;
  let nfcFactory: NfcsFactoryService;

  const testHandler = async ({
    nfcData,
    sdmData,
    updatedFileds,
  }: TTestHandlerInput): Promise<void> => {
    const nfc = await nfcFactory.create(nfcData);
    await handler.handle(new UpdateNfcEvent({ nfc, sdmData }));
    const nfcAfter = await nfcFactory.getEntityByField({ id: nfc.id });

    expect(nfcAfter).toEqual(
      expect.objectContaining({
        // not updatable fields
        id: nfc.id,
        status: nfc.status,
        tagStatus: nfc.tagStatus,
        encryptedShareKey: nfc.encryptedShareKey,
        // updatable fields
        piccData: nfc.piccData,
        uid: nfc.uid,
        encryptionMode: nfc.encryptionMode,
        counter: nfc.counter,
        fileData: nfc.fileData,

        ...updatedFileds,
      }),
    );

    if (Object.keys(updatedFileds).length) {
      expect(nfcAfter?.createdAt).not.toEqual(nfcAfter?.updatedAt);
    } else {
      expect(nfcAfter?.createdAt).toEqual(nfcAfter?.updatedAt);
    }
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [TestModule, NfcsModule],
    }).compile();

    handler = moduleRef.get(UpdateNfcEventHandler);
    nfcFactory = moduleRef.get(NfcsFactoryService);

    await nfcFactory.clearTable();
  });

  afterEach(async () => {
    await nfcFactory.clearTable();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('Empty SDM data. Should not update', async () => {
    await testHandler({ nfcData: {}, sdmData: {}, updatedFileds: {} });
  });

  it('SDM read counter less than DB. Should not update', async () => {
    await testHandler({
      nfcData: { counter: 10 },
      sdmData: { read_ctr: 5 },
      updatedFileds: {},
    });
  });

  it('SDM read counter equal to DB. Should not update', async () => {
    await testHandler({
      nfcData: { counter: 10 },
      sdmData: { read_ctr: 10 },
      updatedFileds: {},
    });
  });

  it('Should update partially', async () => {
    const sdmData: TSdmData = {
      read_ctr: 10,
      picc_data: 'EF963FF7828658A599F3041510671E88',
    };

    await testHandler({
      nfcData: { counter: 5 },
      sdmData,
      updatedFileds: {
        counter: sdmData.read_ctr,
        piccData: sdmData.picc_data,
      },
    });
  });

  it('Should correctly map SDM fields', async () => {
    const sdmData: TSdmData = {
      read_ctr: 10,
      picc_data: 'EF963FF7828658A599F3041510671E88',
      uid: '041E3C8A2D6B80',
      enc_mode: EncryptionMode.AES,
      file_data: '78787878787878787878787878787878',
    };

    await testHandler({
      nfcData: { counter: 5, encryptionMode: EncryptionMode.LRP },
      sdmData,
      updatedFileds: {
        counter: sdmData.read_ctr,
        piccData: sdmData.picc_data,
        uid: sdmData.uid,
        encryptionMode: sdmData.enc_mode as EncryptionMode,
        fileData: sdmData.file_data as string,
      },
    });
  });

  it('Accepts null file data', async () => {
    const sdmData: TSdmData = {
      read_ctr: 10,
      file_data: null,
    };

    await testHandler({
      nfcData: { counter: 5 },
      sdmData,
      updatedFileds: {
        counter: sdmData.read_ctr,
        fileData: sdmData.file_data,
      },
    });
  });
});
