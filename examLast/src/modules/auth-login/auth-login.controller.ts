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
  BadRequestException,
  ValidationPipe,
  UsePipes,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { register } from 'module';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';
import { Request, response, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { repassDto } from './dto/repass.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}
  @Post('register')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Faqat PNG yoki JPG rasm yuklang'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB max
      },
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() userdata: registerDto,
  ) {
    if (!file) throw new BadRequestException('Avatar fayl yuborilishi kerak');

    const avatar_url = `/uploads/avatars/${file.filename}`;
    return await this.authLoginService.registerchi(userdata, avatar_url);
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
