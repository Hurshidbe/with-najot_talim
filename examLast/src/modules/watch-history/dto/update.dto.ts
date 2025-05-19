import { IsInt, Min, Max, IsDecimal } from 'class-validator';

export class UpdateWatchHistoryDto {
  @IsInt()
  @Min(0)
  watched_deuration: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  watched_persentage: number;
}
