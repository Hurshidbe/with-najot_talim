import { HttpException, Injectable } from '@nestjs/common';
import prismaService from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private prismaService: prismaService,
    private configservice: ConfigService,
  ) {}

  async addUser(userdata: any) {
    const saved = await this.prismaService.user.create({ data: userdata });
    return { status: 'success', newUser: saved };
  }

  async getOneById(id: number) {
    const finded = await this.prismaService.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!finded) throw new HttpException('user not found', 404);

    return { status: 'success', user: finded };
  }
}
