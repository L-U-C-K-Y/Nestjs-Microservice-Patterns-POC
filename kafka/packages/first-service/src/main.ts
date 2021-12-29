import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'first', // first-server
          brokers: ['localhost:9092']
        },
        consumer: {
          groupId: 'first-consumer' // first-consumer-server
        }
      },
    },
  );
  await app.listen(() => console.log('First microservice is listening'));
}
bootstrap();
