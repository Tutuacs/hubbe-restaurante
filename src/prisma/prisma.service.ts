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
import { FindReservaDto } from 'src/reserva/Validation/find-reserva.dto';
import { CreateAnyReservaDto, CreateReservaDto } from 'src/reserva/Validation';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Query
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  async ExistEmail(email: string) {
    if (
      await this.usuario.count({
        where: {
          email,
        },
      })
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

  async ExistUsuarioId(id: string) {
    if (
      !(await this.usuario.count({
        where: {
          id,
        },
      }))
    ) {
      throw new BadRequestException('Não existe um usuário com esse id');
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
  async NotExistMesaNumber(numero: number[]) {
    if (
      !(await this.mesa.count({
        where: {
          numero: {
            in: numero,
          },
        },
      }))
    ) {
      throw new BadRequestException('Não existe uma mesa com esse número');
    }
  }

  async ExistMesaId(id: string) {
    if (
      !(await this.mesa.count({
        where: {
          id,
        },
      }))
    ) {
      throw new BadRequestException('Não existe uma mesa com esse id');
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

  async ExistReservaId(id: string) {
    if (
      !(await this.reserva.count({
        where: {
          id,
        },
      }))
    ) {
      throw new BadRequestException('Não existe uma reserva com esse id');
    }
  }

  CreateReserva(data: CreateReservaDto) {
    const dataConvertida = new Date(data.data);
    dataConvertida.setHours(dataConvertida.getHours() + 1);
    data.dataEnd = dataConvertida;
    return this.reserva.create({
      data,
      select: {
        Usuario: {
          select: {
            email: true,
          },
        },
        data: true,
        pessoas: true,
        Mesa: {
          select: {
            numero: true,
            lugares: true,
          },
        },
      },
    });
  }

  async CreateReservaAuto(data: CreateAnyReservaDto, id: string) {
    const reserva = new CreateReservaDto();
    reserva.data = data.data;
    reserva.pessoas = data.pessoas;
    reserva.usuarioId = id;
    const filter = new FindReservaDto();
    filter.data = data.data;
    filter.pessoas = data.pessoas;
    const dataConvertida = new Date(data.data);
    dataConvertida.setHours(dataConvertida.getHours() + 1);
    filter.dataEnd = dataConvertida;
    const mesasDisponiveis = await this.GetReservaDisponivel(filter);
    if (mesasDisponiveis.length == 0) {
      throw new NotFoundException(
        'Não encontramos mesas disponiveis para essa data, tente outra data ou entre em contato com o restaurante.',
      );
    } else if (mesasDisponiveis.length == 1) {
      const mesaUnica = mesasDisponiveis.find(
        (mesa) => mesa.lugares >= data.pessoas,
      );
      if (mesaUnica) {
        reserva.mesaId = [mesaUnica.id];
        return this.CreateReserva(reserva);
      } else {
        throw new NotFoundException(
          'Não encontramos mesas disponiveis para essa data, tente outra data ou entre em contato com o restaurante.',
        );
      }
    }
    if (data.juntarMesas) {
      const mesaUnica = mesasDisponiveis.find(
        (mesa) => mesa.lugares == data.pessoas,
      );
      if (mesaUnica) {
        reserva.mesaId = [mesaUnica.id];
        return this.CreateReserva(reserva);
      }
      reserva.mesaId = this.GetMesasReserva(mesasDisponiveis, data.pessoas);
      return this.CreateReserva(reserva);
    } else {
      const mesa = mesasDisponiveis.find(
        (mesa) => mesa.lugares == data.pessoas,
      );
      if (mesa) {
        reserva.mesaId = [mesa.id];
        return this.CreateReserva(reserva);
      }

      const mesaReserva = mesasDisponiveis.find(
        (mesa) => mesa.lugares > data.pessoas,
      );
      if (!mesaReserva) {
        throw new NotFoundException(
          'Não encontramos mesas disponiveis para essa data, tente outra data ou entre em contato com o restaurante.',
        );
      }
      reserva.mesaId = [mesaReserva.id];
      return this.CreateReserva(reserva);
    }
  }

  async CreateReservaManual(data: CreateAnyReservaDto, id: string) {
    const reserva = new CreateReservaDto();
    reserva.data = data.data;
    reserva.pessoas = data.pessoas;
    reserva.usuarioId = id;
    reserva.mesaId = await this.GetMesasByNumeros(data.mesas, data.data);
    if (reserva.mesaId && reserva.mesaId.length == data.mesas.length)
      return this.CreateReserva(reserva);
    throw new NotFoundException(
      'Parece que você passou o número de uma mesa não disponivel, verifique as mesas novamente e tente novamente.',
    );
  }

  async GetReservaDisponivel(data: FindReservaDto) {
    return this.mesa.findMany({
      where: {
        NOT: {
          Reserva: {
            some: {
              OR: [
                {
                  data: {
                    gte: data.data,
                    lte: data.dataEnd,
                  },
                },
                {
                  dataEnd: {
                    gte: data.data,
                    lte: data.dataEnd,
                  },
                },
                {
                  data: {
                    lte: data.data,
                  },
                  dataEnd: {
                    gte: data.dataEnd,
                  },
                },
              ],
            },
          },
        },
      },
      orderBy: {
        lugares: 'asc',
      },
      select: {
        id: true,
        numero: true,
        lugares: true,
        reservaId: false,
      },
    });
  }

  GetMesasReserva(
    mesas: Array<{ id: string; lugares: number }>,
    pessoas: number,
  ): Array<string> {
    const mesa = mesas.find((mesa) => mesa.lugares == pessoas);
    if (mesa) {
      return [mesa.id];
    } else {
      let somaLugaresReserva = 0;
      let somaLugares: number;
      let arrayReserva = [];
      if (mesas.length == 1 && mesas[0].lugares > pessoas) {
        return [mesas[0].id];
      } else {
        for (let i = mesas.length - 1; i >= 0; i--) {
          for (let j = 0; j < mesas.length - 1; j++) {
            if (mesas[i] == mesas[j] || j >= i) {
              break;
            }
            somaLugares = mesas[i].lugares + mesas[j].lugares;
            if (somaLugares === pessoas) {
              return [mesas[i].id, mesas[j].id];
            } else if (
              (somaLugares > pessoas && somaLugares < somaLugaresReserva) ||
              somaLugaresReserva == 0
            ) {
              arrayReserva = [mesas[i], mesas[j]];
              somaLugaresReserva = somaLugares;
            }
          }
        }

        const mesaReserva = mesas.find((mesa) => mesa.lugares > pessoas);

        if (
          mesaReserva &&
          mesaReserva.lugares <
            arrayReserva[1].lugares + arrayReserva[0].lugares
        ) {
          return [mesaReserva.id];
        } else {
          return [arrayReserva[0].id, arrayReserva[1].id];
        }
      }
    }
  }

  async GetMesasByNumeros(numero: Array<number>, data: Date) {
    const mesas = await this.mesa.findMany({
      where: {
        Reserva: {
          every: {
            NOT: {
              data,
            },
          },
        },
        numero: {
          in: numero,
        },
      },
      select: {
        id: true,
      },
    });

    if (mesas) return mesas.map((mesa) => mesa.id);
    throw new NotFoundException(
      'Não encontramos as mesas selecionadas disponiveis para reservar, procure outra data ou entre em contato com o restaurante.',
    );
  }

  GetReservaById(id: string) {
    return this.reserva.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllReserva() {
    return this.reserva.findMany({
      select: {
        id: true,
        data: true,
        dataEnd: true,
        pessoas: true,
        Mesa: {
          select: {
            numero: true,
            lugares: true,
          },
        },
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  GetAllReservaByUsuario(id: string) {
    return this.reserva.findMany({
      where: {
        usuarioId: id,
      },
      select: {
        id: true,
        data: true,
        dataEnd: true,
        pessoas: true,
        Mesa: {
          select: {
            numero: true,
            lugares: true,
          },
        },
      },
      orderBy: {
        data: 'desc',
      },
    });
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
