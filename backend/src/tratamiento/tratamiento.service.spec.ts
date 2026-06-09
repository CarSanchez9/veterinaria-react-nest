import { Test, TestingModule } from '@nestjs/testing';
import { TratamientoService } from './tratamiento.service';

describe('TratamientoService', () => {
  let service: TratamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TratamientoService],
    }).compile();

    service = module.get<TratamientoService>(TratamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
