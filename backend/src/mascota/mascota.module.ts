import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Mascota } from './entities/mascota.entity';

import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';
import { LogAccesoModule } from 'src/log-acceso/log-acceso.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mascota,
    ]),
    LogAccesoModule,
  ],

  controllers: [
    MascotaController,
  ],

  providers: [
    MascotaService,
  ],
})
export class MascotaModule {}