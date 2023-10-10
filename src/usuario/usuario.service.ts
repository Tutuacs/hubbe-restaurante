import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './Validation/create-usuario.dto';
import { UpdateUsuarioDto } from './Validation/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/enums/role-enum.filter';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsuarioDto) {
    await this.prisma.ExistEmail(data.email);
    return this.prisma.CreateUsuario(data);
  }

  findAll() {
    return this.prisma.GetAllUsuario();
  }

  findAllReservas(token: { id: string; role: Role }) {
    if (token.role != Role.Admin) {
      return this.prisma.GetAllReservaByUsuario(token.id);
    }
    return this.prisma.GetAllReserva();
  }

  async findOne(id: string, token: { id: string; role: Role }) {
    if (token.role != Role.Admin) {
      if (token.id != id)
        throw new UnauthorizedException(
          'Você não tem permissão para visualizar este usuário.',
        );
      return this.prisma.GetUsuarioById(id);
    }
    await this.prisma.ExistUsuarioId(id);
    return this.prisma.GetUsuarioById(id);
  }

  async update(
    id: string,
    data: UpdateUsuarioDto,
    token: { id: string; role: Role },
  ) {
    if (token.role != Role.Admin) {
      if (token.id != id)
        throw new UnauthorizedException(
          'Você não tem permissão para editar este usuário.',
        );
      return this.prisma.UpdateUsuario(id, data);
    } else {
      await this.prisma.ExistUsuarioId(id);
      return this.prisma.UpdateUsuario(id, data);
    }
  }

  async remove(id: string, token: { id: string }) {
    if (id != token.id)
      throw new UnauthorizedException(
        'Você não tem permissão para deletar este usuário.',
      );
    await this.prisma.ExistUsuarioId(id);
    return this.prisma.DeleteUsuario(id);
  }
}
