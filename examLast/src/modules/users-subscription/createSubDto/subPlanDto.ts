import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  plan_id: string;

  @IsBoolean()
  @IsOptional()
  auto_renew?: boolean;
}
