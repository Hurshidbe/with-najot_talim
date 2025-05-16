import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
} from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { register } from 'module';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}
  @Post('register')
  async register(@Body() userdata: registerDto) {
    try {
      return await this.authLoginService.registerchi(userdata);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async loginer(@Body() logdata: loginDto) {
    try {
      return await this.authLoginService.loginchi(logdata);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
