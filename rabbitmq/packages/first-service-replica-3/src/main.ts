import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'first_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  );
  await app.listen(() => console.log('First microservice replica 3 is listening'));
}
bootstrap();
