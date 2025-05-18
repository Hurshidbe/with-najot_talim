import {
  IsBoolean,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateSubscriptionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  duration_days: number;

  @IsJSON()
  @IsOptional()
  features: object;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
