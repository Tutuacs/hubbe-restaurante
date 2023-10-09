import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './Validation';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role-enum.filter';
import { RoleGuard } from 'src/guards/role.guard';
import { Token } from 'src/decorator/token.decorator';
import { FindReservaDto } from './Validation/find-reserva.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reserva')
export class ReservaController {

  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() data: CreateReservaDto) {
    return this.reservaService.create(data);
  }

  @Post('disponiveis')
  disponiveis(@Body() data: FindReservaDto) {
    return this.reservaService.disponiveis(data);
  }
  
  @Get()
  findAll(@Token() token: {id: string, role: Role}) {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Token() token: {id: string, role: Role}) {
    return this.reservaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Token() token: {id: string, role: Role}) {
    return this.reservaService.remove(id);
  }
}
