import { HttpException, Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';
import bcrypt from 'bcrypt';
import { Http2ServerRequest } from 'http2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthLoginService {
  constructor(
    private prisma: prismaservice,
    private jwt: JwtService,
  ) {}

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

  async loginchi(logdata: loginDto) {
    const isRgstrd = await this.prisma.user.findUnique({
      where: { email: logdata.email },
    });

    if (!isRgstrd) throw new HttpException('email yoki parol xato', 402);
    const istruePass = bcrypt.compare(
      isRgstrd.password_hash,
      logdata.password_hash,
    );
    if (!istruePass) throw new HttpException('email yoki parol xato', 402);
    const token = await this.jwt.signAsync({
      email: isRgstrd.email,
      id: isRgstrd.id,
      username: isRgstrd.username,
      role: isRgstrd.role,
    });

    return { message: `tizimga hush kelibsiz ${isRgstrd.username}`, token };
  }
}
