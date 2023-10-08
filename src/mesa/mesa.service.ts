import { Injectable } from '@nestjs/common';
import { CreateMesaDto, UpdateMesaDto } from './Validation';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesaService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateMesaDto) {
    await this.prisma.ExistMesaNumber(data.numero);
    return this.prisma.CreateMesa(data);
  }

  findAll() {
    return this.prisma.GetAllMesas();
  }

  findOne(id: string) {
    return this.prisma.GetMesaById(id);
  }

  update(id: string, data: UpdateMesaDto) {
    return this.prisma.UpdateMesa(id, data);
  }

  remove(id: string) {
    return this.prisma.DeleteMesa(id);
  }
}
