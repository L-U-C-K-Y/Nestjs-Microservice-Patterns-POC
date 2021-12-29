import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(6002);
  console.log('API gateway is listening on PORT 6002')
}
bootstrap();
