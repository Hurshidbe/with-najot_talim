import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class repassDto {
  @IsNotEmpty()
  @IsString()
  oldpass: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newpass: string;
}
