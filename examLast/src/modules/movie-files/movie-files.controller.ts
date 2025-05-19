import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieFilesService } from './movie-files.service';
import { CreateMovieFileDto } from './dto/create-movie-file.dto';
import { UpdateMovieFileDto } from './dto/update-movie-file.dto';

@Controller('movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post()
  create(@Body() createMovieFileDto: CreateMovieFileDto) {
    return this.movieFilesService.create(createMovieFileDto);
  }

  @Get()
  findAll() {
    return this.movieFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieFileDto: UpdateMovieFileDto) {
    return this.movieFilesService.update(+id, updateMovieFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(+id);
  }
}
