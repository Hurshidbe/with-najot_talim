import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: prismaservice) {}

  async createPayment(userId: number, dto: CreatePaymentDto) {
    const subscription = await this.prisma.usersubscription.findUnique({
      where: { id: dto.user_subs_id },
    });

    if (!subscription || subscription.user_id !== userId.toString()) {
      throw new NotFoundException('Subscription not found or access denied');
    }

    return this.prisma.payments.create({
      data: {
        user_subs_id: dto.user_subs_id,
        payment_method: dto.payment_method,
        payment_details: dto.payment_details,
        status: dto.status,
        external_transaction_id: dto.external_transaction_id,
      },
    });
  }

  async getMyPayments(userId: number) {
    return this.prisma.payments.findMany({
      where: {
        user: {
          user_id: userId.toString(),
        },
      },
      include: {
        user: true,
      },
    });
  }
}
