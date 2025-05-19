import { IsBoolean } from 'class-validator';

export class UpdateRenewDto {
  @IsBoolean()
  auto_renew: boolean;
}
