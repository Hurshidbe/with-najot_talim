import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { prismaModule } from './prisma/prisma.module';
import PrismaService from './prisma/prisma.service';

@Module({
  imports: [UsersModule, PostsModule, prismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
