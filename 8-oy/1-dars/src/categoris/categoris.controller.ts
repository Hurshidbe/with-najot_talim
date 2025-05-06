import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorisService } from './categoris.service';
import { CreateCategorisDto } from './dto/create-categoris.dto';
import { UpdateCategorisDto } from './dto/update-categoris.dto';

@Controller('categoris')
export class CategorisController {
  constructor(private readonly categorisService: CategorisService) {}

  @Post()
  create(@Body() createCategorisDto: CreateCategorisDto) {
    return this.categorisService.create(createCategorisDto);
  }

  @Get()
  findAll() {
    return this.categorisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorisDto: UpdateCategorisDto) {
    return this.categorisService.update(+id, updateCategorisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorisService.remove(+id);
  }
}
