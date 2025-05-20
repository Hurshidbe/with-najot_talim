import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard)
  @Post(':movieId')
  addReview(
    @Param('movieId') movieId: string,
    @Req() req: any,
    @Body() dto: CreateReviewDto,
  ) {
    try {
      return this.reviewsService.addReview(req.user.id, movieId, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':movieId')
  getReviews(@Param('movieId') movieId: string) {
    try {
      return this.reviewsService.getReviews(movieId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
