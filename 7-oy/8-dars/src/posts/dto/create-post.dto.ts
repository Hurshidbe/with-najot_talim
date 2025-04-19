import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(0, 72)
  title: string;
  @IsString()
  @Length(0, 150)
  content: string;
}
