import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'third_service' })
  microserviceTest(data: string): string {
    const msg = data + ' - third microservice!' + Date.now()
    console.log(msg)
    return msg;
  }
}
