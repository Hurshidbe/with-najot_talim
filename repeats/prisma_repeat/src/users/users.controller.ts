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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/loginDto';
import { tracingChannel } from 'diagnostics_channel';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registration(@Body() regData: CreateUserDto) {
    try {
      return await this.usersService.registr(regData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async logination(
    @Body() logdata: loginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { message, token } = await this.usersService.login(logdata);
      if (!token) {
        throw new HttpException('Token generatsiyasi xato', 500);
      }
      response.cookie('authToken', token, { httpOnly: true });
      console.log(token);
      return message;
    } catch (error) {
      console.error('Login xatosi:', error);
      throw new HttpException(error.message, error.status);
    }
  }
}
