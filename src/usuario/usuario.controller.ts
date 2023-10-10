import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './Validation/create-usuario.dto';
import { UpdateUsuarioDto } from './Validation/update-usuario.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role-enum.filter';
import { Token } from 'src/decorator/token.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Get()
  findAllReservas(@Token('id') token: { id: string; role: Role }) {
    return this.usuarioService.findAllReservas(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Token() token: { id: string; role: Role }) {
    return this.usuarioService.findOne(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUsuarioDto,
    @Token('id') token: { id: string; role: Role },
  ) {
    return this.usuarioService.update(id, data, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Token('id') token: { id: string }) {
    return this.usuarioService.remove(id, token);
  }
}
