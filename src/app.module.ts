import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MesaModule } from './mesa/mesa.module';
import { ReservaModule } from './reserva/reserva.module';
import { MongoIdCheckMiddleware } from './middlewares/mongo-id-check.middleware';
import { AuthModule } from './auth/auth.module';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsuarioModule),
    MesaModule,
    ReservaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(private prisma: PrismaService) {}

  configure(consumer: MiddlewareConsumer) {
    // 👈 Ativando Middleware para melhorar desempenho
    consumer
      .apply(MongoIdCheckMiddleware)
      .forRoutes({
        path: '*/:id',
        method: RequestMethod.GET,
      })
      .apply(MongoIdCheckMiddleware)
      .forRoutes({
        path: '*/:id',
        method: RequestMethod.PUT,
      })
      .apply(MongoIdCheckMiddleware)
      .forRoutes({
        path: '*/:id',
        method: RequestMethod.DELETE,
      });
  }

  async onModuleInit() {
    // 👈 Criando usuário admin DEFAULT ao iniciar o servidor
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: 'admin@admin.com',
        role: true,
      },
    });
    if (user) {
      if (!(await bcrypt.compare('Hubbe123', user.password))) {
        await this.prisma.usuario.delete({
          where: {
            email: 'admin@admin.com',
          },
        });
        await this.prisma.usuario.create({
          data: {
            email: 'admin@admin.com',
            password: await bcrypt.hash('Hubbe123', 10),
            role: true,
          },
        });
      }
    } else {
      await this.prisma.usuario.create({
        data: {
          email: 'admin@admin.com',
          password: await bcrypt.hash('admin123', 10),
          role: true,
        },
      });
    }
  }
}
