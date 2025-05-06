import { Module } from '@nestjs/common';
import { OrderGetawayService } from './order_getaway.service';
import { OrderGetawayGateway } from './order_getaway.gateway';

@Module({
  providers: [OrderGetawayGateway, OrderGetawayService],
})
export class OrderGetawayModule {}
