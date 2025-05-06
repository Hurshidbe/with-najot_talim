import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('add')
  async addUser(@Body() userdata: any) {
    try {
      return await this.appService.addUser(userdata);
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new HttpException('ID raqam bo‘lishi kerak', 403);
    }

    try {
      return this.appService.getOneById(numericId);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
