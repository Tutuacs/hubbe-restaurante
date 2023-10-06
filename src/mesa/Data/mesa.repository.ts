import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMesaDto, UpdateMesaDto } from '../Validation';

export abstract class Mesa {
  
  private prisma: PrismaService;

  CreateMesa(data: CreateMesaDto) {
    return this.prisma.mesa.create({
      data: data,
    });
  }

  GetMesaById(id: string) {
    return this.prisma.mesa.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllMesas() {
    return this.prisma.mesa.findMany();
  }

  FindMesaByNumero(numero: number) {
    return this.prisma.mesa.count({
      where: {
        numero,
      },
    });
  }

  UpdateMesa(id: string, data: UpdateMesaDto) {
    return this.prisma.mesa.update({
      where: {
        id,
      },
      data: data,
    });
  }

  DeleteMesa(id: string) {
    return this.prisma.mesa.delete({
      where: {
        id,
      },
    });
  }

  // GetMesasByStatus(status: boolean) {
  //     return this.prisma.mesa.findMany({
  //         where: {
  //             status: status,
  //         },
  //     });
  // }
}
