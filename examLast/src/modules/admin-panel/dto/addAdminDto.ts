import { IsNotEmpty, IsString } from 'class-validator';

export class addAdminDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
