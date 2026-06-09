import { Test, TestingModule } from '@nestjs/testing';
import { VacunaController } from './vacuna.controller';
import { VacunaService } from './vacuna.service';

describe('VacunaController', () => {
  let controller: VacunaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacunaController],
      providers: [VacunaService],
    }).compile();

    controller = module.get<VacunaController>(VacunaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
