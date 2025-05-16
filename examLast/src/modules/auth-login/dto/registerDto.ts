import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { isStringObject } from 'util/types';

export class registerDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({ minLength: 6, minUppercase: 1 })
  @MaxLength(16)
  @IsString()
  password_hash: string;
}
