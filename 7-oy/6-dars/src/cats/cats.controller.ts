import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './entities/cats.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('cats')
  async getAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('cat/:id')
  async getCatBYID(@Param('id') id: number) {
    return this.catsService.findCatBYID(id);
  }

  @Post('cat')
  async addCat(@Body() data: Cat): Promise<Cat> {
    return this.catsService.addNewCat(data);
  }

  @Post('cat/:id')
  async updateCatBYID(
    @Param('id') id: number,
    @Body() catdata: Cat,
  ): Promise<object> {
    await this.catsService.updateCatInfo(id, catdata);
    return { message: 'cat info updated successfully ' };
  }

  @Delete('cat:id')
  deleteCatBYID() {}
}
