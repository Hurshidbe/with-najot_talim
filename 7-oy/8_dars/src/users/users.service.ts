import { HttpException, Injectable } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { updatepassDto } from './dto/updatePass.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(regData: registerDto) {
    const bormi = await this.userRepo.findOne({
      where: { email: regData.email },
    });
    if (bormi)
      throw new HttpException('bu email oldin registratsiya qilingan', 402);
    const hashedPass = await bcrypt.hash(regData.password, 12);
    const created = this.userRepo.create({
      ...regData,
      password: hashedPass,
    });
    const added = await this.userRepo.save(created);
    return `hello ${added.name}. registration was successfully`;
  }

  async login(logdata: loginDto) {
    const searchLog = await this.userRepo.findOne({
      where: { email: logdata.email },
    });
    if (!searchLog) throw new HttpException('email yoki parol xato', 402);
    const comparePass = await bcrypt.compare(
      logdata.password,
      searchLog.password,
    );
    if (!comparePass) throw new HttpException('email yoki paro hato', 402);
    const token = await this.jwt.signAsync({
      name: searchLog.name,
      id: searchLog.id,
      email: searchLog.email,
      password: searchLog.password,
    });
    return {
      message: `salom ${searchLog.name}. login muvaffaqiyatli bol'ldi`,
      token,
    };
  }

  async logout(userEmail: string) {
    try {
      await this.userRepo.delete({ email: userEmail });
      return 'logged out';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updatePass(oldPass: string, odlnew: updatepassDto, userId: number) {
    const isSameOld = await bcrypt.compare(odlnew.newpassword, oldPass);
    if (isSameOld)
      throw new HttpException(`siz eski parolingizni kirityapsiz`, 403);
    const compare = await bcrypt.compare(odlnew.oldpassword, oldPass);
    if (!compare)
      throw new HttpException(`oldingi passwordingizni to'g'ri kiriting`, 403);
    const newpass = await bcrypt.hash(odlnew.newpassword, 12);

    const updating = await this.userRepo.update(
      { id: userId },
      { password: newpass },
    );
    if (!updating) throw new HttpException('password yangilanmadi', 403);
    return 'password yangilandi';
  }
}
