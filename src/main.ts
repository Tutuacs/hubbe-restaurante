import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 👈 Ativando Validação de Dados
  await app.listen(3001); // 👈 Rodando na Porta 3000
}
bootstrap();
