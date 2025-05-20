import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { tracingChannel } from 'diagnostics_channel';

@UseGuards(AuthGuard, RolesGuard) //2 ta guardni alohida aalohida yozilsa to'g'ri ishlamas ekan!!!!!!!
@Roles(Role.Superadmin || Role.Admin)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async addKino(@Body() kinoData: CreateMovieDto, @Req() req: any) {
    try {
      const user = await req.user;
      const userid = user.id;
      return await this.moviesService.addKino(kinoData, userid);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updatedMovie: UpdateMovieDto,
    @Req() req: any,
  ) {
    try {
      const user = await req.user;
      const userid = user.id;
      return this.moviesService.updateMovie;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deleteMovieById(@Param('id') id: string, @Req() req: any) {
    try {
      const userId = req.user.userId;
      return await this.moviesService.deleteById(id, userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
