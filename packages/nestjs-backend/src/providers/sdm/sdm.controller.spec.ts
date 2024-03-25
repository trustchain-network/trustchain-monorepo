import { Test, TestingModule } from '@nestjs/testing';
import { SdmController } from './sdm.controller';

describe('SdmController', () => {
  let controller: SdmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SdmController],
    }).compile();

    controller = module.get<SdmController>(SdmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
