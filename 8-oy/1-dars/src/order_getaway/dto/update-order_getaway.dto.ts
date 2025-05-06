import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderGetawayDto } from './create-order_getaway.dto';

export class UpdateOrderGetawayDto extends PartialType(CreateOrderGetawayDto) {
  id: number;
}
