import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateAnyReservaDto, FindReservaDto } from './Validation';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role-enum.filter';
import { RoleGuard } from 'src/guards/role.guard';
import { Token } from 'src/decorator/token.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post('create/:type')
  create(
    @Body() data: CreateAnyReservaDto,
    @Param('type') type: string,
    @Token('id') id: string,
  ) {
    return this.reservaService.create(data, type, id);
  }

  @Post('disponiveis')
  disponiveis(@Body() data: FindReservaDto) {
    return this.reservaService.disponiveis(data);
  }

  @Get()
  findAll(@Token() token: { id: string; role: Role }) {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Token() token: { id: string; role: Role }) {
    return this.reservaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Token() token: { id: string; role: Role }) {
    return this.reservaService.remove(id);
  }
}
