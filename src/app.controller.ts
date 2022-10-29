import { Controller, Get } from '@nestjs/common/decorators';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  @ApiResponse({ status: 200, description: 'Hi :)' })
  @Get('/hi')
  getUser() {
    return this.appService.getUser();
  }
}
