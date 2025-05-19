import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/role.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createPayment(@Req() req: any, @Body() dto: CreatePaymentDto) {
    const userId = req.user.id;
    return this.paymentService.createPayment(userId, dto);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  getMyPayments(@Req() req: any) {
    const userId = req.user.id;
    return this.paymentService.getMyPayments(userId);
  }
}
