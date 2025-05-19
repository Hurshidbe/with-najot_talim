import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  raiting: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
