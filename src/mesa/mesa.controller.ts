import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto, UpdateMesaDto } from './Validation';

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
