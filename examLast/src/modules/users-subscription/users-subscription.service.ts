import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './createSubDto/subPlanDto';
import { UpdateRenewDto } from './createSubDto/update.renew.dto';

@Injectable()
export class UsersSubscriptionService {
  constructor(private prisma: prismaservice) {}
  async selectPlan(userId: string, dto: CreateSubscriptionDto) {
    const plan = await this.prisma.subscriptionmodel.findUnique({
      where: { id: dto.plan_id },
    });

    if (!plan || !plan.is_active) {
      throw new NotFoundException(
        'Bunday obuna rejasi topilmadi yoki faol emas.',
      );
    }

    const existing = await this.prisma.usersubscription.findFirst({
      where: {
        user_id: userId,
        status: 'active',
      },
    });

    if (existing) {
      throw new ForbiddenException('Sizda obuna mavjud.');
    }

    const start = new Date();
    const end = new Date(start);
    end.setDate(start.getDate() + plan.duration_days);

    const subscription = await this.prisma.usersubscription.create({
      data: {
        user_id: userId,
        plan_id: dto.plan_id,
        started_time: start,
        end_date: end,
        auto_renew: dto.auto_renew ?? false,
        status: 'pending_payment',
      },
    });

    return subscription;
  }

  async getMyPlan(userId: string) {
    return this.prisma.usersubscription.findFirst({
      where: {
        user_id: userId,
        status: 'active',
      },
      include: {
        plan: true,
      },
    });
  }

  async updateAutoRenew(userId: string, id: string, dto: UpdateRenewDto) {
    const sub = await this.prisma.usersubscription.findUnique({
      where: { id },
    });

    if (!sub || sub.user_id !== userId) {
      throw new ForbiddenException('Ruxsat yoq.');
    }

    return this.prisma.usersubscription.update({
      where: { id },
      data: { auto_renew: dto.auto_renew },
    });
  }
}
