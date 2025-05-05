import { Injectable } from '@nestjs/common';
import prismaServise from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private prisma: prismaServise,
    private configervice: ConfigService,
  ) {}
  async addUser(data: any) {
    const created = await this.prisma.user.create({ data });
    return created;
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }
}
