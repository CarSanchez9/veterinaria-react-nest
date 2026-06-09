import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsuarioModule } from '../usuario/usuario.module';
import { LogAccesoModule } from '../log-acceso/log-acceso.module';

import { JwtStrategy } from './strategies/jwt.strategy';

import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    UsuarioModule,
    LogAccesoModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
  ],

  exports: [
    PassportModule,
    JwtStrategy,
  ],
})
export class AuthModule {}