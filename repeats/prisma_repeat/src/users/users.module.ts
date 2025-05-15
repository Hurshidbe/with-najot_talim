import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [prismaModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService],
})
export class UsersModule {}
