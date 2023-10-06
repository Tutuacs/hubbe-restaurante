import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../Validation';

export abstract class Usuario {
  private prisma: PrismaService;

  CreateUsuario(data: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: data,
    });
  }

  GetUsuarioById(id: string) {
    return this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllUsuario() {
    return this.prisma.usuario.findMany();
  }

  FindUsuarioByEmail(email: string) {
    return this.prisma.usuario.count({
      where: {
        email,
      },
    });
  }

  UpdateUsuario(id: string, data: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: {
        id,
      },
      data: data,
    });
  }

  DeleteUsuario(id: string) {
    return this.prisma.usuario.delete({
      where: {
        id,
      },
    });
  }
}
