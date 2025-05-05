import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
class prismaServise extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    console.log('database connected');
  }
}

export default prismaServise;
