import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TratamientoController } from './tratamiento.controller';
import { TratamientoService } from './tratamiento.service';

import { Tratamiento } from './entities/tratamiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tratamiento,
    ]),
  ],

  controllers: [
    TratamientoController,
  ],

  providers: [
    TratamientoService,
  ],
})
export class TratamientoModule {}