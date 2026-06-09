import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { LogAccesoModule }
from '../log-acceso/log-acceso.module';

import { Cita } from './entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cita,
    ]),
    LogAccesoModule,
  ],

  controllers: [
    CitaController,
  ],

  providers: [
    CitaService,
  ],
})
export class CitaModule {}