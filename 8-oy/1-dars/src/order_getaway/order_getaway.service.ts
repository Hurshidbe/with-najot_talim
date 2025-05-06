import { Injectable } from '@nestjs/common';
import { CreateOrderGetawayDto } from './dto/create-order_getaway.dto';
import { UpdateOrderGetawayDto } from './dto/update-order_getaway.dto';

@Injectable()
export class OrderGetawayService {
  create(createOrderGetawayDto: CreateOrderGetawayDto) {
    return 'This action adds a new orderGetaway';
  }

  findAll() {
    return `This action returns all orderGetaway`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderGetaway`;
  }

  update(id: number, updateOrderGetawayDto: UpdateOrderGetawayDto) {
    return `This action updates a #${id} orderGetaway`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderGetaway`;
  }
}
