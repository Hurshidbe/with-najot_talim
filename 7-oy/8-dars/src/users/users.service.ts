import { Body, HttpException, Injectable, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const findUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (findUser) throw new Error("Siz oldin ro'yxatdan o'tgansiz❗");
    const user = this.userRepo.create(createUserDto);
    const userData = await this.userRepo.save(user);
    return { message: "Muvafaqiyatli ro'yxatdan o'tdingiz✅", userData };
  }
  async register(registerDto: RegisterUserDto) {
    const findUser = await this.userRepo.findOne({
      where: { username: registerDto.userName },
    });
    if (!findUser)
      throw new Error(
        "Username noto'g'ri kiritilgan yoki oldin ro'yhatdan o'tmagansiz❗",
      );
    if (findUser.password !== registerDto.password)
      throw new Error("Parol noto'g'ri❗");
    const token = this.jwt.sign({
      user_email: findUser.email,
      role: findUser.role,
      user_id: findUser.id,
    });
    return { token, data: { message: 'Tizimga muvafaqiyatli kirdingiz✅' } };
  }
  async getMe(data: any) {
    console.log(data);

    const findUser = await this.userRepo.findOne({
      where: { email: data.user_email },
    });
    return findUser;
  }
  async getAll() {
    return this.userRepo.find();
  }
  async deleteById(id: number) {
    const findUser = await this.userRepo.findOne({ where: { id: id } });
    if (!findUser)
      throw new HttpException('bunday id li user mavjud emas', 500);
    await this.userRepo.remove(findUser);
    return {
      message: "User o'chirib yuborildi",
    };
  }
}
