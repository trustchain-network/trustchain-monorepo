import { Test, TestingModule } from '@nestjs/testing';
import { NfcGroupsService } from './nfc-groups.service';

describe('NfcGroupsService', () => {
  let service: NfcGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcGroupsService],
    }).compile();

    service = module.get<NfcGroupsService>(NfcGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
