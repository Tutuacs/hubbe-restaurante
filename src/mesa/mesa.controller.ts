import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto, UpdateMesaDto } from './Validation';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role-enum.filter';
import { Roles } from 'src/decorator/role.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  create(@Body() data: CreateMesaDto) {
    return this.mesaService.create(data);
  }

  @Get()
  findAll() {
    return this.mesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateMesaDto) {
    return this.mesaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesaService.remove(id);
  }
}
