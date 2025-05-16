import { Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthLoginService {
  constructor(private prisma: prismaservice) {}

  async registerchi(userdata: registerDto) {
    const hashedpass = await bcrypt.hash(userdata.password_hash, 12);
    const saved = this.prisma.user.create({
      data: {
        email: userdata.email,
        username: userdata.username,
        avatar_url: userdata.avatar_url,
        password_hash: hashedpass,
      },
    });
    return { status: 'succes', newUser: saved };
  }

  loginchi(logdata: loginDto) {}
}
