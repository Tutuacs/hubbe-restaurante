import { PrismaService } from 'src/prisma/prisma.service';

export abstract class Reserva {
  private prisma: PrismaService;

  CreateReserva(data: any) {
    return this.prisma.reserva.create({
      data: data,
    });
  }

  GetReservaById(id: string) {
    return this.prisma.reserva.findUnique({
      where: {
        id,
      },
    });
  }

  GetAllReserva() {
    return this.prisma.reserva.findMany();
  }

  DeleteReserva(id: string) {
    return this.prisma.reserva.delete({
      where: {
        id,
      },
    });
  }
}
