import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthLoginModule } from './modules/auth-login/auth-login.module';
import { AuthLoginService } from './modules/auth-login/auth-login.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
    PrismaModule,
    AuthLoginModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => {
        return {
          secret: service.get('JWT'),
          signOptions: {
            expiresIn: '10m',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthLoginService],
})
export class AppModule {}
