import { Injectable } from '@nestjs/common';
import { Reserva } from './Data/reserva.repository';
import { CreateReservaDto } from './Validation';

@Injectable()
export class ReservaService extends Reserva{

  create(data: CreateReservaDto) {
    return this.CreateReserva(data);
  }

  findAll() {
    return this.GetAllReserva();
  }

  findOne(id: string) {
    return this.GetReservaById(id);
  }

  remove(id: string) {
    return this.DeleteReserva(id);
  }

}
