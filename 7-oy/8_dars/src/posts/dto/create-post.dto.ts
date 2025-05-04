import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 500)
  text: string;
}
