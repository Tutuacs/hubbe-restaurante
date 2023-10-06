import { Injectable } from '@nestjs/common';
import { CreateMesaDto, UpdateMesaDto } from './Validation';
import { Mesa } from './Data/mesa.repository';

@Injectable()
export class MesaService extends Mesa{
  create(data: CreateMesaDto) {
    return this.CreateMesa(data);
  }

  findAll() {
    return this.GetAllMesas();
  }

  findOne(id: string) {
    return this.GetMesaById(id);
  }

  update(id: string, data: UpdateMesaDto) {
    return this.UpdateMesa(id, data);
  }

  remove(id: string) {
    return this.DeleteMesa(id);
  }
}
