import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class prismaservice extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    console.log('prisma module ishladi');
  }
}
