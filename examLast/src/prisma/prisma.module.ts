import { Module } from '@nestjs/common';
import { prismaservice } from './prisma.service';

@Module({
  providers: [prismaservice],
  exports: [prismaservice],
})
export class PrismaModule {}
