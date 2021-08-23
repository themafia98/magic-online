import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // app.use(csurf());

  app.useWebSocketAdapter(new IoAdapter(app));

  const port = process.env.SERVER_PORT || 9229;

  await app.listen(port, process.env.DOCKER_CONTAINER_NAME, () => {
    console.log(`server running on port ${port}`);
  });
}

bootstrap();
