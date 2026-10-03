import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() { // <-- A correção foi apenas apagar o ": string" que estava aqui!
    return this.appService.getHello();
  }
}