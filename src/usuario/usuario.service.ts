import { Injectable } from '@nestjs/common';
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

  findOne(id: string, token: { id: string, role: Role}) {
    if(token.role != Role.Admin){
      if(token.id != id)
        throw new Error("Você não tem permissão para visualizar este usuário.");
      return this.prisma.GetUsuarioById(id);
    }
    return this.prisma.GetUsuarioById(id);
  }

  update(id: string, data: UpdateUsuarioDto, token: { id: string, role: Role}) {
    if(token.role != Role.Admin){
      if(token.id != id)
        throw new Error("Você não tem permissão para editar este usuário.");
      return this.prisma.UpdateUsuario(id, data);
    }else{
      return this.prisma.UpdateUsuario(id, data);
    }
  }

  remove(id: string, token: { id: string}) {
    if(id != token.id)
      throw new Error("Você não tem permissão para deletar este usuário.");
    return this.prisma.DeleteUsuario(id);
  }
}
