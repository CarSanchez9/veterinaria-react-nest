import { Test, TestingModule } from '@nestjs/testing';
import { LogAccesoController } from './log-acceso.controller';
import { LogAccesoService } from './log-acceso.service';

describe('LogAccesoController', () => {
  let controller: LogAccesoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogAccesoController],
      providers: [LogAccesoService],
    }).compile();

    controller = module.get<LogAccesoController>(LogAccesoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
