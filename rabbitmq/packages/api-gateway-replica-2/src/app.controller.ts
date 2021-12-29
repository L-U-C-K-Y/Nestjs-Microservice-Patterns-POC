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
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const message = 'first - Replica 2'
    const result =  this.firstClient.send<string>(
      { cmd: 'first_service' },
      message,
    );
    result.subscribe(res => {
      // console.log(`res: ${res}`)
      if (res !== message) {
        console.log(`🤯 CRITICAL: DOES NOT MATCH SENDER MESSAGE`)
      } else {
        console.log('✅ Identical Message')
      }
    })
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/otherFromFirst')
  otherFromFirstTestFirstService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const message = 'otherFromFirst - Replica 2'
    const result =  this.firstClient.send<string>(
      { cmd: 'first_service' },
      message,
    );
    result.subscribe(res => {
      // console.log(`res: ${res}`)
      if (res !== message) {
        console.log(`🤯 CRITICAL: DOES NOT MATCH SENDER MESSAGE`)
      } else {
        console.log('✅ Identical Message')
      }
    })
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/otherCommandFromFirst')
  other2FromFirstTestFirstService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const message = 'first - Replica 2, other 2'
    const result =  this.firstClient.send<string>(
      { cmd: 'first_service_other_command' },
      message,
    );
    result.subscribe(res => {
      // console.log(`res: ${res}`)
      if (res !== message + message) {
        console.log(`🤯 CRITICAL: DOES NOT MATCH SENDER MESSAGE`)
      } else {
        console.log('✅ Identical Message')
      }
    })
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/second')
  testSecondService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    const result = this.secondClient.send<string>(
      { cmd: 'second_service' },
      'Message from',
    );
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/third')
  testThirdService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    const result = this.thirdClient.send<string>(
      { cmd: 'third_service' },
      'Message from',
    );
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  @Get('/undefined')
  testWhatService(): Observable<string> {
    const now = new Date()
    const time: string = now.toISOString()
    console.time(time)
    const result = this.firstClient.send<string>({ cmd: 'undefined' }, 'Message from');
    // console.log(result)
    console.timeEnd(time)
    return result
  }

  async onApplicationBootstrap() {
    await this.firstClient.connect();
    await this.secondClient.connect();
    await this.thirdClient.connect();
  }
}
