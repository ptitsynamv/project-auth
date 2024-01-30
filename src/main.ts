import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.GOOGLE_CLIENT_APP_PORT || 3001;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `http://localhost:${port}`,
  });
  await app.listen(3000);
}
bootstrap();
