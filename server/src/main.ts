import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 9229, process.env.DOCKER_CONTAINER_NAME);
}
bootstrap();
