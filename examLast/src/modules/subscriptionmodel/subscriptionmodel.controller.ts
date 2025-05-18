import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { CreateSubscriptionDto } from './dto/userSubscription-model';
import { SubscriptionService } from './subscriptionmodel.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getAll() {
    try {
      return this.subscriptionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Superadmin)
  async create(@Body() dto: CreateSubscriptionDto) {
    try {
      return this.subscriptionService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Superadmin)
  async update(@Param('id') id: string, @Body() dto: CreateSubscriptionDto) {
    try {
      return this.subscriptionService.update(id, dto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Superadmin)
  async remove(@Param('id') id: string) {
    try {
      return this.subscriptionService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
