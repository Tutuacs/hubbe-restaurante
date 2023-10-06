import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './Validation';

@Controller('reserva')
export class ReservaController {

  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() data: CreateReservaDto) {
    return this.reservaService.create(data);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(id);
  }
}
