import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersSubscriptionService } from './users-subscription.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateSubscriptionDto } from './createSubDto/subPlanDto';
import { UpdateRenewDto } from './createSubDto/update.renew.dto';

@UseGuards(AuthGuard)
@Controller('user-subscription')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UsersSubscriptionService,
  ) {}

  @Post('select')
  async selectPlan(@Req() req: any, @Body() dto: CreateSubscriptionDto) {
    return this.userSubscriptionService.selectPlan(req.user.id, dto);
  }

  @Get('my-plan')
  @UseGuards(AuthGuard)
  async getMyPlan(@Req() req: any) {
    const userId = req.user.id;
    console.log(userId);
    return this.userSubscriptionService.getMyPlan(userId);
  }

  @Patch(':id/renew')
  async updateAutoRenew(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateRenewDto,
  ) {
    return this.userSubscriptionService.updateAutoRenew(req.user.id, id, dto);
  }
}
