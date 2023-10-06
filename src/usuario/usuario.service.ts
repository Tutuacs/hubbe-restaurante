import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './Validation/create-usuario.dto';
import { UpdateUsuarioDto } from './Validation/update-usuario.dto';
import { Usuario } from './Data/usuario.repository';

@Injectable()
export class UsuarioService extends Usuario{

  create(data: CreateUsuarioDto) {
    return this.CreateUsuario(data) ;
  }

  findAll() {
    return this.GetAllUsuario();
  }

  findOne(id: string) {
    return this.GetUsuarioById(id);
  }

  update(id: string, data: UpdateUsuarioDto) {
    return this.UpdateUsuario(id, data);
  }

  remove(id: string) {
    return this.DeleteUsuario(id);
  }
}
