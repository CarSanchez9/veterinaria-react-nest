import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogAcceso } from './entities/log-acceso.entity';
import { LogAccesoController } from './log-acceso.controller';
import { LogAccesoService } from './log-acceso.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogAcceso,
    ]),
  ],

  controllers: [
    LogAccesoController,
  ],

  providers: [
    LogAccesoService,
  ],

  exports: [
    LogAccesoService,
  ],
})
export class LogAccesoModule {}