import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: prismaservice) {}

  async addReview(userId: string, movieId: string, dto: CreateReviewDto) {
    const movie = await this.prisma.movies.findUnique({
      where: { id: movieId },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    if (dto.raiting < 1 || dto.raiting > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const existing = await this.prisma.reviews.findFirst({
      where: { user_id: userId, movie_id: movieId },
    });

    if (existing) {
      return this.prisma.reviews.update({
        where: { id: existing.id },
        data: {
          raiting: dto.raiting,
          comment: dto.comment,
          created_at: new Date(),
        },
      });
    }

    return this.prisma.reviews.create({
      data: {
        user_id: userId,
        movie_id: movieId,
        raiting: dto.raiting,
        comment: dto.comment,
      },
    });
  }

  async getReviews(movieId: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id: movieId },
    });
    if (!movie) throw new NotFoundException('Movie not found');

    const reviews = await this.prisma.reviews.findMany({
      where: { movie_id: movieId },
      include: { user: { select: { id: true, username: true } } },
      orderBy: { created_at: 'desc' },
    });

    // ratingni hisoblash
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.raiting, 0) / reviews.length
        : null;

    return {
      averageRating: avgRating,
      reviews,
    };
  }
}
