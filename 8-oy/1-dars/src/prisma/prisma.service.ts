import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

class prismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
}

export default prismaService;
