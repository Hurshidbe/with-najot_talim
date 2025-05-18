import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  slug: string;

  @Length(1, 500)
  description: string;
}
