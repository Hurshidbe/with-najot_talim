import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 32)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 32)
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @MaxLength(16)
  password: string;
}
