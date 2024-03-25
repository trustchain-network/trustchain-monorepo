import { Test, TestingModule } from '@nestjs/testing';
import { NfcCategoriesService } from './nfc-categories.service';

describe('NfcCategoriesService', () => {
  let service: NfcCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcCategoriesService],
    }).compile();

    service = module.get<NfcCategoriesService>(NfcCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
