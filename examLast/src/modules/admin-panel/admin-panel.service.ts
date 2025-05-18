import { HttpException, Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { addAdminDto } from './dto/addAdminDto';
import { Prisma, Role } from '@prisma/client';
import { emit } from 'process';
@Injectable()
export class AdminPanelService {
  constructor(private prisma: prismaservice) {}
  async newAdminAdder(newAdminData: addAdminDto) {
    const adminationEmail = newAdminData.email.trim();
    const isExist = await this.prisma.user.findUnique({
      where: { email: adminationEmail },
    });
    if (!isExist)
      throw new HttpException('Bu user database-da mavjud emas', 403);

    const admincha = await this.prisma.user.update({
      where: { email: adminationEmail },
      data: { role: 'Admin' },
    });

    return { message: 'success', admincha };
  }

  async unadmination(admindata: addAdminDto) {
    const adminationEmail = admindata.email.trim();
    const isExist = await this.prisma.user.findUnique({
      where: { email: adminationEmail },
    });
    if (!isExist)
      throw new HttpException('Bu user database-da mavjud emas', 403);

    const unadmincha = await this.prisma.user.update({
      where: { email: adminationEmail },
      data: { role: 'User' },
    });

    return { message: 'success', unadmincha };
  }

  async newSuper(admindata: addAdminDto) {
    const adminationEmail = admindata.email.trim();
    const isExist = await this.prisma.user.findUnique({
      where: { email: adminationEmail },
    });
    if (!isExist)
      throw new HttpException('Bu user database-da mavjud emas', 403);

    const supercha = await this.prisma.user.update({
      where: { email: adminationEmail },
      data: { role: 'Superadmin' },
    });

    return { message: 'success', supercha };
  }

  async getAdmins() {
    const admins = await this.prisma.user.findMany({
      where: { role: 'Admin' },
    });
    return { status: 'success', data: admins };
  }

  async getallusers() {
    const users = await this.prisma.user.findMany({
      where: { role: 'User' },
    });
    return { status: 'success', data: users };
  }
}
