import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class changePassDto {
  @IsString()
  @IsNotEmpty()
  oldpass: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  newPass: string;
}
