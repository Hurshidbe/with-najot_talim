import { All, Body, Controller, Delete, Get, Post } from '@nestjs/common';
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

  @Get('cat:id')
  getCatBYID() {}

  @Post('cat')
  async addCat(@Body() data: Cat): Promise<Cat> {
    return this.catsService.addNewCat(data);
  }

  @Post('cat:id')
  updateCatBYID() {}

  @Delete('cat:id')
  deleteCatBYID() {}
}
