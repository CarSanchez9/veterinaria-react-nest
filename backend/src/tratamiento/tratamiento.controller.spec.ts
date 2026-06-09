import { Test, TestingModule } from '@nestjs/testing';
import { TratamientoController } from './tratamiento.controller';
import { TratamientoService } from './tratamiento.service';

describe('TratamientoController', () => {
  let controller: TratamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TratamientoController],
      providers: [TratamientoService],
    }).compile();

    controller = module.get<TratamientoController>(TratamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
