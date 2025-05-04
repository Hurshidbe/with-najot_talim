import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class updatepassDto {
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  @MaxLength(16)
  @IsNotEmpty()
  @IsString()
  oldpassword: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  @MaxLength(16)
  @IsNotEmpty()
  @IsString()
  newpassword: string;
}
