import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { prismaservice } from 'src/prisma/prisma.service';
import { addAdminDto } from '../admin-panel/dto/addAdminDto';
import { time } from 'console';

@Injectable()
export class MoviesService {
  constructor(private prisma: prismaservice) {}
  async addKino(kinoData: CreateMovieDto, userid: string) {
    const newkino = await this.prisma.movies.create({
      data: { ...kinoData, created_by: userid },
    });

    return { status: 'success', addedKino: newkino };
  }

  async updateMovie(id: string, updatedMovie: UpdateMovieDto, userId: string) {
    const existing = await this.prisma.movies.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Bunday film topilmadi');
    }
    if (existing.created_by !== userId) {
      throw new ForbiddenException('Bu filmni yangilash huquqiga ega emassiz');
    }
    return this.prisma.movies.update({
      where: { id },
      data: {
        ...updatedMovie,
      },
    });
  }

  async deleteById(id: string, userId: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Film topilmadi');
    }
    await this.prisma.movies.delete({
      where: { id },
    });
    return { message: `film o'chirildi` };
  }
}
