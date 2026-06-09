import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoriaClinica } from './entities/historia-clinica.entity';

import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinicaService } from './historia-clinica.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HistoriaClinica,
    ]),
  ],

  controllers: [
    HistoriaClinicaController,
  ],

  providers: [
    HistoriaClinicaService,
  ],
})
export class HistoriaClinicaModule {}