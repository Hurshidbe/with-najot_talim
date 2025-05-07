import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 32)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 32)
  email: string;

  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional() // Optional qilib qo'ysangiz
  @IsString() // String bo'lishi kerak
  userImgUrl?: string; // Endi null yoki string qabul qiladi
}
