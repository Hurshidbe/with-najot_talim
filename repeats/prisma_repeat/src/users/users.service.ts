import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto } from './dto/loginDto';
import { error, log } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async registr(regData: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: regData });
    return { status: 'success', newUser: newUser };
  }

  async login(logdata: loginDto) {
    if (!logdata || !logdata.email || !logdata.password) {
      throw new BadRequestException('Email yoki parol yuborilmagan');
    }
    const isRgstrd = await this.prisma.user.findFirst({
      where: { email: logdata.email, password: logdata.password },
    });
    if (!isRgstrd) throw new HttpException('Login yoki parol xato', 402);

    // Token yaratish
    const token = this.jwt.sign({
      userId: isRgstrd.id,
      name: isRgstrd.name,
      email: isRgstrd.email,
    });
    console.log(token);
    if (!token) {
      throw new HttpException('Token yaratishda xatolik', 500);
    }

    console.log('Generated Token:', token);
    return { message: `Hello ${isRgstrd.name}.`, token };
  }
}
