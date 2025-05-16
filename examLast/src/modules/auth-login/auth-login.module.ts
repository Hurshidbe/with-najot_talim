import { Module } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthLoginController } from './auth-login.controller';
import { JsonWebTokenError, JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [AuthLoginController],
  providers: [AuthLoginService, JwtService],
})
export class AuthLoginModule {}
