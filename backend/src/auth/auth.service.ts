import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { UsuarioService } from '../usuario/usuario.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

import { LogAccesoService } from '../log-acceso/log-acceso.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly logAccesoService: LogAccesoService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ) {

    const usuarioExistente =
      await this.usuarioService.findByEmail(
        registerDto.email,
      );

    if (usuarioExistente) {
      throw new BadRequestException(
        'El email ya está registrado',
      );
    }

    const passwordHash =
      await bcrypt.hash(
        registerDto.password,
        10,
      );

    return await this.usuarioService.create({
      ...registerDto,
      password: passwordHash,
    });
  }

  async validateUser(
    email: string,
    password: string,
  ) {

    const usuario =
      await this.usuarioService.findByEmail(
        email,
      );

    console.log('EMAIL:', email);
    console.log('USUARIO:', usuario);

    if (!usuario) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    const passwordValido =
      await bcrypt.compare(
        password,
        usuario.password,
      );

    console.log(
      'PASSWORD VALIDA:',
      passwordValido,
    );

    if (!passwordValido) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    return usuario;
  }

  async login(
    loginDto: LoginDto,
  ) {

    const usuario =
      await this.validateUser(
        loginDto.email,
        loginDto.password,
      );

    await this.logAccesoService.create({
      idUsuario: usuario.idUsuario,
      accion: 'LOGIN',
      ip: 'localhost',
    });

    const payload = {
      idUsuario: usuario.idUsuario,
      email: usuario.email,
      rol: usuario.rol?.nombre,
    };

    const token =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      token,
      usuario: usuario.username,
      email: usuario.email,
      rol: usuario.rol?.nombre,
    };
  }

  async logout(
    idUsuario: number,
  ) {

    await this.logAccesoService.create({
      idUsuario,
      accion: 'LOGOUT',
      ip: 'localhost',
    });

    return {
      mensaje: 'Logout exitoso',
    };
  }
}