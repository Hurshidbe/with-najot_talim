import { Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class MovieFilesService {
  constructor(private prisma: prismaservice) {}

  async create(
    movieId: string,
    fileUrl: string,
    quality: string,
    language = 'uz',
  ) {
    return this.prisma.movie_files.create({
      data: {
        movie_id: movieId,
        file_url: fileUrl,
        quality: quality,
        language,
      },
    });
  }

  async findAllByMovie(movieId: string) {
    return this.prisma.movie_files.findMany({
      where: { movie_id: movieId },
    });
  }

  async remove(id: string) {
    return this.prisma.movie_files.delete({
      where: { id },
    });
  }
}
