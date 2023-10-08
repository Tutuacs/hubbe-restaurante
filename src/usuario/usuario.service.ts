import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './Validation/create-usuario.dto';
import { UpdateUsuarioDto } from './Validation/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findOne(id: string) {
    return this.prisma.GetUsuarioById(id);
  }

  update(id: string, data: UpdateUsuarioDto) {
    return this.prisma.UpdateUsuario(id, data);
  }

  remove(id: string) {
    return this.prisma.DeleteUsuario(id);
  }
}
