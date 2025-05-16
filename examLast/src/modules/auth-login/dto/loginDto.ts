import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class loginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({ minLength: 6, minUppercase: 1 })
  @MaxLength(16)
  @IsString()
  password_hash: string;
}
