import {
  BadRequestException,
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from 'src/auth/Validation';
import { CreateMesaDto, UpdateMesaDto } from 'src/mesa/Validation';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuario/Validation';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role-enum.filter';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async ExistEmail(email: string) {
    if (
      (await this.usuario.count({
        where: {
          email,
        },
      }))
    ) {
      throw new ConflictException('Já existe um usuário com esse email');
    }
  }
  async ExistLogin(data: LoginDto) {
    const user = await this.GetUsuarioByEmail(data.email);
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Senha incorreta');
    } else {
      if (user.role == true) {
        return { email: user.email, role: Role.Admin, id: user.id };
      } else {
        return { email: user.email, role: Role.User, id: user.id };
      }
    }
  }

  CreateUsuario(data: CreateUsuarioDto) {
    data.password = bcrypt.hashSync(data.password, 10);
    return this.usuario.create({
      data: data,
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
      },
    });
  }

  GetUsuarioById(id: string) {
    return this.usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
      },
    });
  }

  async GetUsuarioByEmail(email: string) {
    const user = await this.usuario.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  GetAllUsuario() {
    return this.usuario.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
      },
    });
  }

  FindUsuarioByEmail(email: string) {
    return this.usuario.count({
      where: {
        email,
      },
    });
  }

  UpdateUsuario(id: string, data: UpdateUsuarioDto) {
    return this.usuario.update({
      where: {
        id,
      },
      data: data,
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
      },
    });
  }

  // Mesa
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  async ExistMesaNumber(numero: number) {
    if (
      await this.mesa.count({
        where: {
          numero,
        },
      })
    ) {
      throw new BadRequestException('Já existe uma mesa com esse número');
    }
  }

  CreateMesa(data: CreateMesaDto) {
    return this.mesa.create({
      data: data,
    });
  }

  GetMesaById(id: string) {
    return this.mesa.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllMesas() {
    return this.mesa.findMany();
  }

  FindMesaByNumero(numero: number) {
    return this.mesa.count({
      where: {
        numero,
      },
    });
  }

  UpdateMesa(id: string, data: UpdateMesaDto) {
    return this.mesa.update({
      where: {
        id,
      },
      data: data,
    });
  }

  DeleteMesa(id: string) {
    return this.mesa.delete({
      where: {
        id,
      },
    });
  }

  // Reserva
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  CreateReserva(data: any) {
    return this.reserva.create({
      data: data,
    });
  }

  GetReservaById(id: string) {
    return this.reserva.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllReserva() {
    return this.reserva.findMany();
  }

  DeleteReserva(id: string) {
    return this.reserva.delete({
      where: {
        id,
      },
    });
  }

  DeleteUsuario(id: string) {
    return this.usuario.delete({
      where: {
        id,
      },
    });
  }
}
