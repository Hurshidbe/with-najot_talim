import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { prismaModule } from 'src/prisma/prisma.module';
import PrismaService from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private Prisma: PrismaService) {}

  async addUser(userdata: CreateUserDto) {
    return this.Prisma.user.create({
      data: userdata as any,
    });
  }
}
