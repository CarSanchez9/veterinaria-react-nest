import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cliente } from './entities/cliente.entity';

import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

import { LogAccesoModule } from '../log-acceso/log-acceso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
    ]),

    LogAccesoModule,
  ],

  controllers: [
    ClienteController,
  ],

  providers: [
    ClienteService,
  ],
})
export class ClienteModule {}