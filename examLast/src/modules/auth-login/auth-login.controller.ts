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
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { register } from 'module';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';
import { Request, response, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { repassDto } from './dto/repass.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';

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
  async loginer(
    @Body() logdata: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authLoginService.loginchi(logdata);
    try {
      res.cookie('authtoken', data.token, { httpOnly: true });
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post('repass')
  async updateUser(@Body() newPass: repassDto, @Req() req: any) {
    try {
      const user = await req.user;
      const userid = user.id;
      const userPass = user.password;
      return this.authLoginService.passChanger(newPass, userid, userPass);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const userid = user.id;

    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return this.authLoginService.logout(userid);
  }
}
