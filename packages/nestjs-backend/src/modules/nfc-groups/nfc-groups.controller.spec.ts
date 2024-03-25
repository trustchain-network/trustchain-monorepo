import { Test, TestingModule } from '@nestjs/testing';
import { NfcGroupsController } from './nfc-groups.controller';

describe('NfcGroupsController', () => {
  let controller: NfcGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfcGroupsController],
    }).compile();

    controller = module.get<NfcGroupsController>(NfcGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
