import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
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

  @IsNotEmpty()
  @Length(6, 16)
  @IsStrongPassword({ minLowercase: 1, minNumbers: 1 })
  password_hash: string;

  @IsNotEmpty()
  avatar_url: string;
}
