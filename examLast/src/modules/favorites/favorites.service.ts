import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: prismaservice) {}

  async addToFavorites(userId: string, movieId: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id: movieId },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    const existing = await this.prisma.favorites.findFirst({
      where: { user_id: userId, movie_id: movieId },
    });
    if (existing) return existing;

    return this.prisma.favorites.create({
      data: {
        user_id: userId,
        movie_id: movieId,
      },
    });
  }

  async removeFromFavorites(userId: string, movieId: string) {
    const favorite = await this.prisma.favorites.findFirst({
      where: { user_id: userId, movie_id: movieId },
    });
    if (!favorite) throw new NotFoundException('Favorite not found');

    return this.prisma.favorites.delete({
      where: { id: favorite.id },
    });
  }

  async getMyFavorites(userId: string) {
    return this.prisma.favorites.findMany({
      where: { user_id: userId },
      include: {
        movie: true, // kinoni ham qaytaradi
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
