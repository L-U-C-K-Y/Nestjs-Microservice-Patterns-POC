import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('FIRST_SERVICE') private readonly firstClient: ClientKafka,
    // @Inject('SECOND_SERVICE') private readonly secondClient: ClientKafka,
    // @Inject('THIRD_SERVICE') private readonly thirdClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.firstClient.subscribeToResponseOf('first');
    this.firstClient.subscribeToResponseOf('second');
    this.firstClient.subscribeToResponseOf('third');
    this.firstClient.subscribeToResponseOf('undefined');
  }

  @Get('/first')
  testFirstService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const result =  this.firstClient.send<string>(
      'first',
      'Message from',
    );
    console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/second')
  testSecondService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    const result = this.firstClient.send<string>(
      'second',
      'Message from',
    );
    console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/third')
  testThirdService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    const result = this.firstClient.send<string>(
      'third',
      'Message from',
    );
    console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/undefined')
  testWhatService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const result = this.firstClient.send<string>('undefined', 'Message from');
    console.log(result)
    console.timeEnd(time)
    return result
  }
}
