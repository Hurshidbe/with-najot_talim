import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get('my')
  getMyPayments(@Req() req: any) {
    return this.paymentsService.myPayments(req.user.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Superadmin || Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }
}
