import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'first_service' })
  microserviceTest(@Payload() data: string, @Ctx() context: RmqContext): string {
    console.log(context)
    // console.log(context.getChannelRef())
    // console.log(context.getPattern())
    console.log(context.getMessage())
    // console.log(context.getArgs())
    // console.log(context.getArgByIndex(0))
    // const msg = data + ' - first microservice!' + Date.now()
    const msg = data
    console.log(msg)
    return msg;
  }
}
