import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MesaModule } from './mesa/mesa.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [PrismaModule, UsuarioModule, MesaModule, ReservaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const user = await this.prisma.usuario.findFirst();
    if (!user) {
      await this.prisma.usuario.create({
        data: {
          email: 'admin@admin.com',
          password: 'admin123',
          admin: true,
        },
      });
    }
  }
}
