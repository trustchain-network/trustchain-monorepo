import { Test, TestingModule } from '@nestjs/testing';
import { NfcsController } from './nfcs.controller';
import { NfcsService } from './nfcs.service';

describe('NfcsController', () => {
  let controller: NfcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfcsController],
      providers: [NfcsService],
    }).compile();

    controller = module.get<NfcsController>(NfcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
