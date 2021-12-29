import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('first')
  microserviceTest(data: string): string {
    const msg = data + ' - first microservice!' + Date.now()
    console.log(msg)
    return msg;
  }

  @MessagePattern('second')
  microserviceTest2(data: string): string {
    const msg = data + ' - first microservice.2!' + Date.now()
    console.log(msg)
    return msg;
  }

  @MessagePattern('third')
  microserviceTest3(data: string): string {
    const msg = data + ' - first microservice.3!' + Date.now()
    console.log(msg)
    return msg;
  }
}
