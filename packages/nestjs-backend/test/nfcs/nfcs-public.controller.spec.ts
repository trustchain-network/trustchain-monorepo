import { NfcsFactoryService } from '#test/factory/nfcs.factory.service';
import { TestApp } from '#test/utils/test-app';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@nestjs/cqrs';
import { NFC } from 'src/modules/nfcs/domain/nfc';
import { NfcsModule } from 'src/modules/nfcs/nfcs.module';
import { HttpService } from 'src/providers/http/http.service';

const spyEventBus = jest.spyOn(EventBus.prototype, 'publish');
const spyHttpService = jest.spyOn(HttpService.prototype, 'get');

describe('NfcsPublicController (e2e)', () => {
  let testApp: TestApp;
  let nfcFactory: NfcsFactoryService;
  let sdmDomain: string;
  let nfc: NFC;

  const testTagValidation = (
    tagType: 'tagpt' | 'tag' | 'tagtt',
    query: Record<string, any>,
    sdmData: Record<string, any>,
  ): void => {
    const url = `/public/nfcs/${tagType}`;

    it('OK. Tag validated', async () => {
      spyHttpService.mockResolvedValueOnce(sdmData);

      const { body } = await testApp
        .httpClient()
        .get(`${url}/${nfc.id}`)
        .query(query)
        .expect(200);

      expect(body).toEqual(sdmData);

      expect(spyHttpService).toHaveBeenCalledTimes(1);
      expect(spyHttpService).toHaveBeenCalledWith(
        `${sdmDomain}/api/${tagType}`,
        query,
      );

      expect(spyEventBus).toHaveBeenCalledTimes(1);
      expect(spyEventBus).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            nfc: expect.objectContaining({
              id: nfc.id,
              counter: nfc.counter,
              encryptionMode: nfc.encryptionMode,
              uid: nfc.uid,
            }),
            sdmData,
          },
        }),
      );
    });

    it('FAIL. SDM service error', async () => {
      spyHttpService.mockRejectedValueOnce({ error: 'error' });

      const { body } = await testApp
        .httpClient()
        .get(`${url}/${nfc.id}`)
        .query(query)
        .expect(422);

      expect(body).toEqual({ status: 422, error: 'tagValidationFailed' });

      expect(spyHttpService).toHaveBeenCalledTimes(1);
      expect(spyHttpService).toHaveBeenCalledWith(
        `${sdmDomain}/api/${tagType}`,
        query,
      );

      expect(spyEventBus).not.toHaveBeenCalled();
    });

    it('FAIL. Tag not found', async () => {
      await testApp
        .httpClient()
        .get(`${url}/db37afd8-1764-3b0e-b4b1-7247d11a1ea7`)
        .query(query)
        .expect(404);

      expect(spyHttpService).not.toHaveBeenCalled();
      expect(spyEventBus).not.toHaveBeenCalled();
    });
  };

  beforeAll(async () => {
    testApp = await TestApp.init({
      testingModules: [NfcsModule],
    });
    nfcFactory = testApp.app.get(NfcsFactoryService);

    sdmDomain = testApp.app.get(ConfigService).get('app.sdmDomain') || '';

    await nfcFactory.clearTable();
  });

  beforeEach(async () => {
    nfc = await nfcFactory.create();
  });

  afterEach(async () => {
    await nfcFactory.clearTable();

    spyEventBus.mockClear();
    spyHttpService.mockClear();
  });

  afterAll(async () => {
    await testApp.closeApp();
  });

  describe('Validate tagpt scan: /public/nfcs/tagpt/:id (GET)', () => {
    testTagValidation(
      'tagpt',
      {
        ctr: '000006',
        uid: '041E3C8A2D6B80',
        cmac: '4B00064004B0B3D3',
      },
      {
        enc_mode: 'AES',
        read_ctr: 6,
        uid: '041E3C8A2D6B80',
      },
    );
  });

  describe('Validate tag scan: /public/nfcs/tag/:id (GET)', () => {
    testTagValidation(
      'tag',
      {
        picc_data: '1FCBE61B3E4CAD980CBFDD333E7A4AC4A579569BAFD22C5F',
        cmac: '4231608BA7B02BA9',
      },
      {
        enc_mode: 'LRP',
        file_data: null,
        read_ctr: 3,
        tt_status: '',
        uid: '04940E2A2F7080',
      },
    );
  });

  describe('Validate tagtt scan: /public/nfcs/tagtt/:id (GET)', () => {
    testTagValidation(
      'tagtt',
      {
        picc_data: '8EE8E27DE3974FFE245F96C71087129B2E8449C9FF346F65',
        enc: '48987A0D55638C017D1F4DC3D8ADD910',
        cmac: '862E781E52244A75',
      },
      {
        enc_mode: 'LRP',
        file_data: '4f4f2d2d2d2d2d2d2d2d2d2d2d2d2d2d',
        read_ctr: 1,
        tt_status: 'tampered_open',
        uid: '04940E2A2F7080',
      },
    );
  });
});
