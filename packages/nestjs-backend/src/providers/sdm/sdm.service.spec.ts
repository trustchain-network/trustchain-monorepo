import { Test, TestingModule } from '@nestjs/testing';
import { SdmService } from './sdm.service';

describe('SdmService', () => {
  let service: SdmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SdmService],
    }).compile();

    service = module.get<SdmService>(SdmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
