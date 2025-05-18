import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, isNotEmpty, IsString, Length } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(1, 150)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(1, 150)
  @IsNotEmpty()
  slug: string;

  @IsString()
  @Length(1, 500)
  description: string;

  release_year: number;

  duration_minutes: number;

  @IsString()
  @IsNotEmpty()
  poster_url: string;
  raiting: number;
}
