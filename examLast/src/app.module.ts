import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthLoginModule } from './modules/auth-login/auth-login.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT'),
          signOptions: { expiresIn: '100m' },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
