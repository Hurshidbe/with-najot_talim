import { Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';

@Module({
  controllers: [AuthLoginController],
  providers: [AuthLoginService],
})
export class AuthLoginModule {}
