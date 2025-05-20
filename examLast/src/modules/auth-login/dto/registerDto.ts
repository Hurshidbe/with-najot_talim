import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsStrongPassword,
} from 'class-validator';

export class registerDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 16)
  // @IsStrongPassword({ minLowercase: 1, minNumbers: 1 })
  password_hash: string;
}
