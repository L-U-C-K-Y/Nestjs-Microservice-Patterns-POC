import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FIRST_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'first', // first-client
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'first-consumer' // first-consumer-client
          }
        },
      },
      // {
      //   name: 'SECOND_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'second',
      //       brokers: ['localhost:9092']
      //     },
      //     consumer: {
      //       groupId: 'second-consumer'
      //     }
      //   },
      // },
      // {
      //   name: 'THIRD_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'third',
      //       brokers: ['localhost:9092']
      //     },
      //     consumer: {
      //       groupId: 'third-consumer'
      //     }
      //   },
      // },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
