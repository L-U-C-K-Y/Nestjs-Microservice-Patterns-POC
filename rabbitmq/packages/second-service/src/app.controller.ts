import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'second_service' })
  microserviceTest(data: string): string {
    const msg = data + ' - second microservice!' + Date.now()
    console.log(msg)
    return msg;
  }
}
