import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':movieId')
  addFavorite(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.addToFavorites(req.user.id, movieId);
  }

  @Delete(':movieId')
  removeFavorite(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.removeFromFavorites(req.user.id, movieId);
  }

  @Get('my')
  getMyFavorites(@Req() req: any) {
    return this.favoritesService.getMyFavorites(req.user.id);
  }
}
