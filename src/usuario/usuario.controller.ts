import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './Validation/create-usuario.dto';
import { UpdateUsuarioDto } from './Validation/update-usuario.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Acess } from 'src/decorator/role.decorator';
import { Role } from 'src/decorator/role-enum.filter';

@UseGuards(RoleGuard, AuthGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  
  @Post()
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  } 
  
  @Acess(Role.Pode)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
