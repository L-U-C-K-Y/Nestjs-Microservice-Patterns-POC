import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('FIRST_SERVICE') private readonly firstClient: ClientProxy,
    @Inject('SECOND_SERVICE') private readonly secondClient: ClientProxy,
    @Inject('THIRD_SERVICE') private readonly thirdClient: ClientProxy,
  ) {}

  @Get('/first')
  testFirstService(): Observable<string> {
    const result =  this.firstClient.send<string>(
      { cmd: 'first_service' },
      'Message from',
    );
    console.log(result)
    return result
  }

  @Get('/second')
  testSecondService(): Observable<string> {
    const result = this.secondClient.send<string>(
      { cmd: 'second_service' },
      'Message from',
    );
    console.log(result)
    return result
  }

  @Get('/third')
  testThirdService(): Observable<string> {
    const result = this.thirdClient.send<string>(
      { cmd: 'third_service' },
      'Message from',
    );
    console.log(result)
    return result
  }

  @Get('/undefined')
  testWhatService(): Observable<string> {
    const result = this.firstClient.send<string>({ cmd: 'undefined' }, 'Message from');
    console.log(result)
    return result
  }

  async onApplicationBootstrap() {
    await this.firstClient.connect();
    await this.secondClient.connect();
    await this.thirdClient.connect();
  }
}
