import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnyReservaDto, FindReservaDto } from './Validation';
import { Role } from 'src/enums/role-enum.filter';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAnyReservaDto, type: string, id: string) {
    if (type == 'auto') {
      return this.prisma.CreateReservaAuto(data, id);
    } else if (type == 'manual') {
      if (data.mesas)
        return this.prisma.CreateReservaManual(data, id);
      throw new NotFoundException(
        'Você deve selecionar pelo menos o número de uma mesa para criar uma reserva manual.',
      );
    } else {
      throw new NotFoundException(
        "Você deve selecionar um método válido, escolha entre 'auto' ou 'manual'.",
      );
    }
  }

  disponiveis(data: FindReservaDto) {
    return this.prisma.GetReservaDisponivel(data);
  }

  findAll(token: { id: string; role: Role }) {
    if (token.role != Role.Admin) {
      return this.prisma.GetAllReservaByUsuario(token.id);
    }
    return this.prisma.GetAllReserva();
  }

  async findOne(id: string, token: { id: string; role: Role }) {
    await this.prisma.ExistReservaId(id);
    if (token.role != Role.Admin) {
      const reserva = await this.prisma.GetReservaById(id);
      if (reserva.usuarioId != token.id) {
        throw new NotFoundException(
          'Você não tem permissão para visualizar esta reserva.',
        );
      }
    }
    return this.prisma.GetReservaById(id);
  }

  async remove(id: string, token: { id: string; role: Role }) {
    await this.prisma.ExistReservaId(id);
    if (token.role != Role.Admin) {
      const reserva = await this.prisma.GetReservaById(id);
      if (reserva.usuarioId != token.id) {
        throw new NotFoundException(
          'Você não tem permissão para visualizar esta reserva.',
        );
      }
    }
    return this.prisma.DeleteReserva(id);
  }
}
