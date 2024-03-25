import { Test, TestingModule } from '@nestjs/testing';
import { NfcsService } from './nfcs.service';

describe('NfcsService', () => {
  let service: NfcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcsService],
    }).compile();

    service = module.get<NfcsService>(NfcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
