import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  password: any;
}
