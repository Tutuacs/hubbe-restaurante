import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservaDto, CreateAnyReservaDto, FindReservaDto } from './Validation';

@Injectable()
export class ReservaService{

  constructor(private readonly prisma: PrismaService){}

  create(data: CreateAnyReservaDto, type: string, id: string) {
    const reserva = new CreateReservaDto();
    reserva.data = data.data;
    reserva.pessoas = data.pessoas;
    reserva.usuarioId = id; 
    if(type == 'auto'){
      return this.prisma.CreateReservaAuto(data, id);
    }else if( type == 'manual'){
      return this.prisma.CreateReserva(data);
    }else{
      throw new Error("Tipo de reserva inválido, você deve escolher entre 'auto' ou 'manual'");
    }
  }

  disponiveis(data: FindReservaDto){
    return this.prisma.GetReservaDisponivel(data);
  }

  findAll() {
    return this.prisma.GetAllReserva();
  }

  findOne(id: string) {
    return this.prisma.GetReservaById(id);
  }

  remove(id: string) {
    return this.prisma.DeleteReserva(id);
  }

}
