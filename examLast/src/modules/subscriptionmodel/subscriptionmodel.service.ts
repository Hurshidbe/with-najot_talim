import { Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/userSubscription-model';
import { updateSubscriptionDto } from './dto/update.subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: prismaservice) {}

  async findAll() {
    return await this.prisma.subscriptionmodel.findMany({
      where: { is_active: true },
    });
  }

  async create(dto: CreateSubscriptionDto) {
    return await this.prisma.subscriptionmodel.create({
      data: dto,
    });
  }

  async update(id: string, dto: updateSubscriptionDto) {
    return await this.prisma.subscriptionmodel.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.subscriptionmodel.delete({
      where: { id },
    });
  }
}
