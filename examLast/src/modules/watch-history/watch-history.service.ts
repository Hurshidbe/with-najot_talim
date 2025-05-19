import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { UpdateWatchHistoryDto } from './dto/update.dto';

@Injectable()
export class WatchHistoryService {
  constructor(private readonly prisma: prismaservice) {}

  async updateHistory(
    userId: string,
    movieId: string,
    dto: UpdateWatchHistoryDto,
  ) {
    const movie = await this.prisma.movies.findUnique({
      where: { id: movieId },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    const existing = await this.prisma.watch_history.findFirst({
      where: { user_id: userId, movie_id: movieId },
    });

    if (existing) {
      return this.prisma.watch_history.update({
        where: { id: existing.id },
        data: {
          watched_deuration: dto.watched_deuration,
          watched_persentage: dto.watched_persentage,
          last_watched: new Date(),
        },
      });
    }

    return this.prisma.watch_history.create({
      data: {
        user_id: userId,
        movie_id: movieId,
        watched_deuration: dto.watched_deuration,
        watched_persentage: dto.watched_persentage,
      },
    });
  }

  async getMyHistory(userId: string) {
    return this.prisma.watch_history.findMany({
      where: { user_id: userId },
      include: {
        movie: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { last_watched: 'desc' },
    });
  }
}
