import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  ); // 👈 Ativando Validação de Dados
  const config = new DocumentBuilder() // 👈 Ativando Swagger
    .setTitle('Documentação com Swagger - Arthur Silva - Hubbe')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .addTag('Hubbe')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Arthur_Silva', app, document);
  await app.listen(`${env.PORT}`); // 👈 Rodando na Porta 3000
}
bootstrap();
