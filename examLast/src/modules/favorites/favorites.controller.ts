import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':movieId')
  addFavorite(@Param('movieId') movieId: string, @Req() req: any) {
    try {
      return this.favoritesService.addToFavorites(req.user.id, movieId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':movieId')
  removeFavorite(@Param('movieId') movieId: string, @Req() req: any) {
    try {
      return this.favoritesService.removeFromFavorites(req.user.id, movieId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('my')
  getMyFavorites(@Req() req: any) {
    try {
      return this.favoritesService.getMyFavorites(req.user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
