import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { UsersService } from './users/users.service';
import { prismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    prismaModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const jwtSecret = config.get('JWT');
        if (!jwtSecret) {
          throw new Error('JWT secret is not defined in .env');
        }
        console.log('JWT Secret:', jwtSecret); // JWT kalitini konsolga chiqarish
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '10m' },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
