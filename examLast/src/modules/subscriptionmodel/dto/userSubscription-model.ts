import {
  IsString,
  IsNumber,
  IsJSON,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration_days: number;

  @IsJSON()
  features: object;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
