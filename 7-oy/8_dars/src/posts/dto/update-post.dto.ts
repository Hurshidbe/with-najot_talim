import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @Length(2, 150)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 500)
  text: string;
}
