import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacuna } from './entities/vacuna.entity';

import { VacunaController } from './vacuna.controller';
import { VacunaService } from './vacuna.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vacuna,
    ]),
  ],

  controllers: [
    VacunaController,
  ],

  providers: [
    VacunaService,
  ],
})
export class VacunaModule {}