import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthLoginModule } from './modules/auth-login/auth-login.module';

@Module({
  imports: [PrismaModule, AuthLoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
