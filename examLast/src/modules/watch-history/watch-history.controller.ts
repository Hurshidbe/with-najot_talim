import {
  Controller,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateWatchHistoryDto } from './dto/update.dto';

@Controller('history')
@UseGuards(AuthGuard)
export class WatchHistoryController {
  constructor(private readonly historyService: WatchHistoryService) {}

  @Patch(':movieId')
  updateHistory(
    @Param('movieId') movieId: string,
    @Req() req: any,
    @Body() dto: UpdateWatchHistoryDto,
  ) {
    return this.historyService.updateHistory(req.user.id, movieId, dto);
  }

  @Get('my')
  getMyHistory(@Req() req: any) {
    return this.historyService.getMyHistory(req.user.id);
  }
}
