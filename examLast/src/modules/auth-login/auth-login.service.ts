import {
  Body,
  HttpException,
  Injectable,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';
import * as bcrypt from 'bcrypt';
import { Http2ServerRequest } from 'http2';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { repassDto } from './dto/repass.dto';
import { userData } from 'src/interfaces/req-user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { error } from 'console';

@Injectable()
export class AuthLoginService {
  constructor(
    private prisma: prismaservice,
    private jwt: JwtService,
  ) {}
  /////////// registerFunc
  async registerchi(userdata: registerDto) {
    const hashedpass = await bcrypt.hash(userdata.password_hash, 12);
    const saved = await this.prisma.user.create({
      data: {
        email: userdata.email,
        username: userdata.username,
        avatar_url: userdata.avatar_url,
        password_hash: hashedpass,
      },
    });
    return { status: 'succes', newUser: saved };
  }
  //////////   login func
  async loginchi(logdata: loginDto) {
    const isRgstrd = await this.prisma.user.findUnique({
      where: { email: logdata.email },
    });

    if (!isRgstrd) throw new HttpException('email yoki parol xato', 402);

    const istruePass = await bcrypt.compare(
      logdata.password_hash,
      isRgstrd.password_hash,
    );

    if (!istruePass) throw new HttpException('email yoki parol xato', 402);

    const token = this.jwt.sign({
      id: isRgstrd.id,
      username: isRgstrd.username,
      role: isRgstrd.role,
      password: isRgstrd.password_hash,
    });
    return { message: `Tizimga hush kelibsiz ${isRgstrd.username}`, token };
  }
  ////////////////// repass func
  async passChanger(newPass: repassDto, userid: string, userPass: string) {}
}
