import { Global, Module } from '@nestjs/common';
import { prismaservice } from './prisma.service';
@Global()
@Module({
  providers: [prismaservice],
  exports: [prismaservice],
})
export class PrismaModule {}
