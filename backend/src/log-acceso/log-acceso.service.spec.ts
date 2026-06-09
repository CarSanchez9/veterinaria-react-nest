import { Test, TestingModule } from '@nestjs/testing';
import { LogAccesoService } from './log-acceso.service';

describe('LogAccesoService', () => {
  let service: LogAccesoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogAccesoService],
    }).compile();

    service = module.get<LogAccesoService>(LogAccesoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
