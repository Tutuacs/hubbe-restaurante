import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './Validation';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindReservaDto } from './Validation/find-reserva.dto';

@Injectable()
export class ReservaService{

  constructor(private readonly prisma: PrismaService){}

  create(data: CreateReservaDto) {
    return this.prisma.CreateReserva(data);
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
