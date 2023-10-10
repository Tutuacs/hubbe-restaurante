import { Injectable } from '@nestjs/common';
import { CreateMesaDto, UpdateMesaDto } from './Validation';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MesaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMesaDto) {
    await this.prisma.ExistMesaNumber(data.numero);
    return this.prisma.CreateMesa(data);
  }

  findAll() {
    return this.prisma.GetAllMesas();
  }

  async findOne(id: string) {
    await this.prisma.ExistMesaId(id);
    return this.prisma.GetMesaById(id);
  }

  async update(id: string, data: UpdateMesaDto) {
    await this.prisma.ExistMesaId(id);
    return this.prisma.UpdateMesa(id, data);
  }

  async remove(id: string) {
    await this.prisma.ExistMesaId(id);
    return this.prisma.DeleteMesa(id);
  }
}
