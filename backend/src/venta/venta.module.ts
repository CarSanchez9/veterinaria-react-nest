import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Venta } from './entities/venta.entity';

import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';
import { LogAccesoModule }
from '../log-acceso/log-acceso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venta,
    ]),
    LogAccesoModule,
  ],

  controllers: [
    VentaController,
  ],

  providers: [
    VentaService,
  ],
})
export class VentaModule {}