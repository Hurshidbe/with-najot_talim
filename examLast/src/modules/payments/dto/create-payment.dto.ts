import { IsUUID, IsEnum, IsString, IsObject } from 'class-validator';
import { pay_met, payment_stat } from '@prisma/client';

export class CreatePaymentDto {
  @IsUUID()
  user_subs_id: string;

  @IsEnum(pay_met)
  payment_method: pay_met;

  @IsObject()
  payment_details: object;

  @IsEnum(payment_stat)
  status: payment_stat;

  @IsString()
  external_transaction_id: string;
}
