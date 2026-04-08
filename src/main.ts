//importações
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//função de inicialização
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00' //fuso horario
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); //perimite as requisições
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
