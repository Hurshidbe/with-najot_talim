import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Response, Request } from 'express';
import authGuard from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() regData: registerDto) {
    try {
      return this.usersService.register(regData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async login(@Body() logData: loginDto, @Res() res: Response) {
    try {
      const { token, message } = await this.usersService.login(logData);
      res.cookie('authToken', token, { httpOnly: true });
      return res.send(message);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @UseGuards(authGuard)
  @Post('logout')
  logout() {
    return 'fuck you';
  }
}
