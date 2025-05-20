import { IsEnum, IsString, IsUrl, IsOptional } from 'class-validator';
import { quality } from 'src/enums/movieEnum';

export class CreateMovieFileDto {
  @IsUrl()
  file_url: string;

  @IsEnum(quality)
  quality: quality;

  @IsOptional()
  @IsString()
  language?: string;
}
