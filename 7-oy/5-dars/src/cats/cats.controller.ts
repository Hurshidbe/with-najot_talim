import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { LoggerService } from '../logger/logger.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject('LOGGER_SERVICE') private logger: LoggerService,
  ) {}

  @Get()
  findAll(@Query('limit') limit?: string) {
    this.logger.log(`Maksimal mushuklar soni: ${limit || 'cheksiz'}`);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.warn(`ID bilan mushuk olinmoqda: ${id}`);
    return this.catsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    this.logger.log('Yangi mushuk yaratildi: ' + JSON.stringify(body));
    return { message: 'Yaratildi', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    this.logger.log(`ID=${id} bo'yicha mushuk yangilandi`);
    return { message: 'Yangilandi', id, data: body };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.warn(`ID=${id} bo'yicha mushuk o'chirildi`);
    return { message: 'O‘chirildi', id };
  }
}
