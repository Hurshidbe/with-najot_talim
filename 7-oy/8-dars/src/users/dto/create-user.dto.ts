import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  username: string;
  @Length(4, 16)
  @IsNotEmpty()
  password: any;
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(3, 20)
  @IsOptional()
  full_name: string;
  @IsString()
  @Length(4, 5)
  @IsOptional()
  role: string;
}
