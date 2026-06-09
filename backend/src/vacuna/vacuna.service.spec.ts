import { Test, TestingModule } from '@nestjs/testing';
import { VacunaService } from './vacuna.service';

describe('VacunaService', () => {
  let service: VacunaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacunaService],
    }).compile();

    service = module.get<VacunaService>(VacunaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
