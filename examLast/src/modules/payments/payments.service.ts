import { Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: prismaservice) {}

  async create(dto: CreatePaymentDto) {
    const payment = await this.prisma.payments.create({
      data: dto,
    });
    return { message: 'Payment created', payment };
  }

  async myPayments(userId: string) {
    const subscriptions = await this.prisma.usersubscription.findMany({
      where: { user_id: userId },
      select: { id: true },
    });

    const subsIds = subscriptions.map((s) => s.id);

    const payments = await this.prisma.payments.findMany({
      where: { user_subs_id: { in: subsIds } },
    });

    return payments;
  }

  async findOne(id: string) {
    const payment = await this.prisma.payments.findUnique({ where: { id } });
    return payment;
  }
}
