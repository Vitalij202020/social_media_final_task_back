import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  await app.listen(process.env.PORT ?? 5000, () => {
    console.log(`Server running on port ${process.env.PORT ?? 5000}`);
  });
}
bootstrap();
