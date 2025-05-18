import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  plan_id: number;
}
