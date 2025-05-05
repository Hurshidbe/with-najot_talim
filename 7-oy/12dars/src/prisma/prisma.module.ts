import { Module } from '@nestjs/common';
import prismaServise from './prisma.service';

@Module({
  providers: [prismaServise],
  exports: [prismaServise],
})
export class prismaModule {}
