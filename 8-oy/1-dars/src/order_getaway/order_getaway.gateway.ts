import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { OrderGetawayService } from './order_getaway.service';
import { CreateOrderGetawayDto } from './dto/create-order_getaway.dto';
import { UpdateOrderGetawayDto } from './dto/update-order_getaway.dto';

@WebSocketGateway()
export class OrderGetawayGateway {
  constructor(private readonly orderGetawayService: OrderGetawayService) {}

  @SubscribeMessage('createOrderGetaway')
  create(@MessageBody() createOrderGetawayDto: CreateOrderGetawayDto) {
    return this.orderGetawayService.create(createOrderGetawayDto);
  }

  @SubscribeMessage('findAllOrderGetaway')
  findAll() {
    return this.orderGetawayService.findAll();
  }

  @SubscribeMessage('findOneOrderGetaway')
  findOne(@MessageBody() id: number) {
    return this.orderGetawayService.findOne(id);
  }

  @SubscribeMessage('updateOrderGetaway')
  update(@MessageBody() updateOrderGetawayDto: UpdateOrderGetawayDto) {
    return this.orderGetawayService.update(updateOrderGetawayDto.id, updateOrderGetawayDto);
  }

  @SubscribeMessage('removeOrderGetaway')
  remove(@MessageBody() id: number) {
    return this.orderGetawayService.remove(id);
  }
}
