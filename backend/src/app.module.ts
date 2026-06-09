import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { MascotaModule } from './mascota/mascota.module';
import { CitaModule } from './cita/cita.module';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { VacunaModule } from './vacuna/vacuna.module';
import { ProductoModule } from './producto/producto.module';
import { VentaModule } from './venta/venta.module';
import { LogAccesoModule } from './log-acceso/log-acceso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: 'localhost',

      port: 3306,

      username: 'root',

      password: '',

      database: 'veterinaria2',

      autoLoadEntities: true,

      synchronize: true,
    }),

    RolModule,

    UsuarioModule,

    AuthModule,

    ClienteModule,

    MascotaModule,

    CitaModule,

    HistoriaClinicaModule,

    TratamientoModule,

    VacunaModule,

    ProductoModule,

    VentaModule,

    LogAccesoModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}