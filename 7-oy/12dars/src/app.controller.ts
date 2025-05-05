import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addUser(@Body() data: any) {
    try {
      return await this.appService.addUser(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.appService.getAll();
    } catch (error) {}
  }
}
