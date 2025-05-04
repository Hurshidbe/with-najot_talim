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
import { updatepassDto } from './dto/updatePass.dto';
import { strict } from 'assert';

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
  @Delete('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    const userEmail = req.user['email'];
    await this.usersService.logout(userEmail);
    res.clearCookie('authToken');
    res.send('Logged out successfully');
  }

  @UseGuards(authGuard)
  @Patch('changepass')
  updateUser(@Body() odlnew: updatepassDto, @Req() req: any) {
    const oldPass = req.user['password'];
    const userId = req.user['id'];
    return this.usersService.updatePass(oldPass, odlnew, userId);
  }
}
