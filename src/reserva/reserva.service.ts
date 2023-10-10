import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnyReservaDto, FindReservaDto } from './Validation';

@Injectable()
export class ReservaService{

  constructor(private readonly prisma: PrismaService){}

  create(data: CreateAnyReservaDto, type: string, id: string) {
    if(type == 'auto'){
      return this.prisma.CreateReservaAuto(data, id);
    }else if( type == 'manual'){
      return this.prisma.CreateReservaManual(data, id);
    }else{
      throw new NotFoundException("Tipo de reserva inválido, você deve escolher entre 'auto' ou 'manual'");
    }
  }

  disponiveis(data: FindReservaDto){
    return this.prisma.GetReservaDisponivel(data);
  }

  findAll() {
    return this.prisma.GetAllReserva();
  }

  async findOne(id: string) {
    await this.prisma.ExistReservaId(id);
    return this.prisma.GetReservaById(id);
  }

  async remove(id: string) {
    await this.prisma.ExistReservaId(id);
    return this.prisma.DeleteReserva(id);
  }

}
