import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  maxLength,
} from 'class-validator';

export class registerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 30)
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  @MaxLength(16)
  @IsNotEmpty()
  password: string;
}
