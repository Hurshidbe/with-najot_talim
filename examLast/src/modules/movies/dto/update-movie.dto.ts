import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
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
